import express from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authenticate, authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.route("/").get(authenticate, getAllCategories).post(authenticate, authorize, createCategory)
router.route("/:id").get(authenticate, getCategoryById).put(authenticate, authorize, updateCategory).delete(authenticate, authorize, deleteCategory)

export default router;
