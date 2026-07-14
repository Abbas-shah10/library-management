import express from "express";
import { createBook, deleteBook, getAllbooks, getBookById, updateBook } from "../controllers/books.controller.js";
import { authenticate, isAdmin } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();


router.route("/").post(authenticate, isAdmin, createBook).get(authenticate, isAdmin, getAllbooks)
router.route("/:bookId").put(authenticate, isAdmin, updateBook).delete(authenticate, isAdmin, deleteBook).get(authenticate, isAdmin, getBookById)


export default router;
