import express from "express";
import multer from "multer";
import path from "path";
import { getProducts, getCategories, getBrands, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/brands", getBrands);

router.post("/", verifyToken, isAdmin, upload.single("image"), createProduct);
router.put("/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;