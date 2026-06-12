import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);


export default router;