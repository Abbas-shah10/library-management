import express from "express";
import { createBook, deleteBook, getAllbooks, getBookById, updateBook } from "../controllers/books.controller.js";
import { authenticate, authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();


router.route("/").post(authenticate, authorize, createBook).get(authenticate, authorize, getAllbooks)
router.route("/:bookId").put(authenticate, authorize, updateBook).delete(authenticate, authorize, deleteBook).get(authenticate, authorize, getBookById)


export default router;
