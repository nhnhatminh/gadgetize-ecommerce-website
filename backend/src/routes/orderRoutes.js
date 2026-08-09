import express from "express";
import {
  createOrder,
  checkCoupon,
  getOrders,
  getOrderById,
  getAllOrdersAdmin,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.post("/check-coupon", checkCoupon);
router.get("/", verifyToken, getOrders);
router.get("/admin", verifyToken, isAdmin, getAllOrdersAdmin);
router.get("/admin/dashboard-stats", verifyToken, isAdmin, getDashboardStats);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;