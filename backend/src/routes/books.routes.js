import express from "express";
import { createBook, deleteBook, updateBook } from "../controllers/books.controller.js";
import { authenticate, isAdmin } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();


router.route("/").post(authenticate, isAdmin, createBook)
router.route("/:bookId").put(authenticate, isAdmin, updateBook).delete(authenticate, isAdmin, deleteBook)


export default router;
