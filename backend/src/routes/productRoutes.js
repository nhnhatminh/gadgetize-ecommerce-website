import express from "express";
import { getProducts, getCategories, getBrands } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/brands", getBrands);

export default router;