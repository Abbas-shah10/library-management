import express from "express";
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js'
import { createAuthor, deleteAuthor, getAuthorById, updateAuthor } from "../controllers/author.controller.js";
const router = express.Router();


router.route('/').post(authenticate, isAdmin, createAuthor);
router.route('/:id').put(authenticate, isAdmin, updateAuthor).get(authenticate, isAdmin, getAuthorById).delete(authenticate, isAdmin, deleteAuthor)


export default router;
