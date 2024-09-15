import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.get("/", protectRoute, adminRoute, getProducts);
router.get("/:id", protectRoute, adminRoute, getProduct);
router.patch("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;