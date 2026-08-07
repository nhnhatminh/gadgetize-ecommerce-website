import express from "express";
import { createOrder, getOrders, getOrderById, getAllOrdersAdmin, updateOrderStatus, checkCoupon } from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);
router.post("/check-coupon", checkCoupon);
router.get("/", getOrders);
router.get("/admin", isAdmin, getAllOrdersAdmin);
router.get("/:id", getOrderById);
router.put("/:id/status", isAdmin, updateOrderStatus);

export default router;