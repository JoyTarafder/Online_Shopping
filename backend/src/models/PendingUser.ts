import mongoose, { Schema, Document } from "mongoose";

export interface IPendingUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  verificationCode: string;
  verificationCodeExpiry: Date;
  createdAt: Date;
}

const pendingUserSchema = new Schema<IPendingUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    verificationCode: { type: String, required: true },
    verificationCodeExpiry: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: 900 }, // Auto self-clean unverified registrations after 15 mins
  },
  { timestamps: true }
);

const PendingUser = mongoose.model<IPendingUserDocument>("PendingUser", pendingUserSchema);
export default PendingUser;
