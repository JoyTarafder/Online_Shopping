import mongoose, { Connection } from "mongoose";
import dns from "dns";

// Fallback DNS for MongoDB Atlas SRV resolution
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (error) {
  console.warn("⚠️ Warning: Failed to set custom DNS servers:", error);
}

export let secondaryConnection: Connection | null = null;

/**
 * Register global plugin on Mongoose schemas to automatically sync all write
 * operations (save, insertMany, update, delete) to the secondary backup MongoDB cluster in real-time.
 */
mongoose.plugin((schema) => {
  // 1. Real-time Sync on Document Save (.save())
  schema.post("save", function (doc) {
    if (!secondaryConnection || !secondaryConnection.db) return;
    const collectionName = this.collection.name;
    secondaryConnection.db
      .collection(collectionName)
      .replaceOne({ _id: doc._id as any }, doc.toObject() as any, { upsert: true })
      .catch((err) =>
        console.error(`⚠️ Dual-DB Sync Warning [${collectionName}.save]:`, err.message)
      );
  });

  // 2. Real-time Sync on insertMany
  schema.post("insertMany", function (docs) {
    if (!secondaryConnection || !secondaryConnection.db) return;
    const collectionName = this.collection.name;
    const rawDocs = Array.isArray(docs)
      ? docs.map((d: any) => (d.toObject ? d.toObject() : d))
      : [];
    if (rawDocs.length === 0) return;

    const ops: any[] = rawDocs.map((doc: any) => ({
      replaceOne: {
        filter: { _id: doc._id },
        replacement: doc,
        upsert: true,
      },
    }));

    secondaryConnection.db
      .collection(collectionName)
      .bulkWrite(ops)
      .catch((err) =>
        console.error(`⚠️ Dual-DB Sync Warning [${collectionName}.insertMany]:`, err.message)
      );
  });

  // 3. Real-time Sync on Query Updates (findOneAndUpdate, updateOne, updateMany)
  schema.post(["findOneAndUpdate", "updateOne", "updateMany"], async function () {
    if (!secondaryConnection || !secondaryConnection.db) return;
    const collectionName = this.model?.collection?.name;
    const filter = this.getFilter();
    if (!collectionName || !filter) return;

    try {
      const updatedDocs = await this.model.find(filter).lean();
      if (updatedDocs && updatedDocs.length > 0) {
        const ops: any[] = updatedDocs.map((doc: any) => ({
          replaceOne: {
            filter: { _id: doc._id },
            replacement: doc,
            upsert: true,
          },
        }));
        await secondaryConnection.db.collection(collectionName).bulkWrite(ops);
      }
    } catch (err: any) {
      console.error(`⚠️ Dual-DB Sync Warning [${collectionName}.update]:`, err.message);
    }
  });

  // 4. Real-time Sync on Query Deletes (findOneAndDelete, deleteOne, deleteMany)
  schema.post(["findOneAndDelete", "deleteOne", "deleteMany"], async function () {
    if (!secondaryConnection || !secondaryConnection.db) return;
    const collectionName = this.model?.collection?.name;
    const filter = this.getFilter();
    if (!collectionName || !filter) return;

    try {
      await secondaryConnection.db.collection(collectionName).deleteMany(filter as any);
    } catch (err: any) {
      console.error(`⚠️ Dual-DB Sync Warning [${collectionName}.delete]:`, err.message);
    }
  });
});

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // 1. Connect to Primary Database
    const conn = await mongoose.connect(uri, {
      dbName: "shajsutro",
    });

    console.log(`✓ Primary MongoDB connected: ${conn.connection.host}`);

    // 2. Connect to Secondary Backup Database
    const secondaryUri = process.env.MONGODB_SECONDARY_URI;
    if (secondaryUri) {
      try {
        secondaryConnection = mongoose.createConnection(secondaryUri, {
          dbName: "shajsutro",
        });
        await secondaryConnection.asPromise();
        console.log(`✓ Secondary Backup MongoDB connected: ${secondaryConnection.host}`);
        console.log(`⚡ Real-time Dual-DB Sync Enabled (Primary ↔ Secondary)`);
      } catch (secErr: any) {
        console.error("⚠️ Warning: Failed to connect Secondary MongoDB:", secErr.message);
      }
    }
  } catch (error) {
    console.error("✗ Primary MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
