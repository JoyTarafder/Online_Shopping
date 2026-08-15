import { Router } from "express";
import {
  getDashboardStats,
  getAdminProducts,
  getAllUsers,
  createUser,
  updateUser,
  blockUser,
  deleteUser,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  confirmPayment,
  updateExchangeStatus,
  getAllContactMessages,
  markContactMessageRead,
  getAdminActivityAlerts,
  getAllAdminUsers,
  updateAdminPermissions,
} from "../controllers/admin.controller";
import { protect, adminOnly, rootAdminOnly } from "../middleware/auth.middleware";

const router = Router();

router.use(protect, adminOnly);

router.get("/stats", getDashboardStats);
router.get("/activity-alerts", getAdminActivityAlerts);
router.get("/team", rootAdminOnly, getAllAdminUsers);

// Product management (admin view — includes hidden products)
router.get("/products", getAdminProducts);

// User management
router.get("/users", getAllUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/permissions", rootAdminOnly, updateAdminPermissions);
router.put("/users/:id/block", blockUser);
router.delete("/users/:id", deleteUser);

// Order management
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderDetails);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/confirm-payment", confirmPayment);
router.put("/orders/:id/exchange", updateExchangeStatus);

// Contact messages
router.get("/messages", getAllContactMessages);
router.put("/messages/:id/read", markContactMessageRead);

export default router;
