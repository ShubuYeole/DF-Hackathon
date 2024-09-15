import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.route.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createCategory);
router.get("/", protectRoute, adminRoute, getCategories);
router.get("/:id", protectRoute, adminRoute, getCategory);
router.patch("/:id", protectRoute, adminRoute, updateCategory);
router.delete("/:id", protectRoute, adminRoute, deleteCategory);


export default router;
