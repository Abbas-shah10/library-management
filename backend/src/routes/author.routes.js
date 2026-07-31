import express from "express";
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js'
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/author.controller.js";
const router = express.Router();


router.route('/').post(authenticate, authorize, createAuthor).get(authenticate, authorize, getAllAuthors);
router.route('/:id').put(authenticate, authorize, updateAuthor).get(authenticate, authorize, getAuthorById).delete(authenticate, authorize, deleteAuthor)


export default router;
