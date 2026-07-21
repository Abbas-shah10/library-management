import express from 'express'
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js'
import { borrowBook, getAllLoans, getLoanById, returnBook } from '../controllers/loans.controller.js';
const router = express.Router();

router.route("/").post(authenticate, isAdmin, borrowBook).get(authenticate, isAdmin, getAllLoans)
router.route('/:id/return').patch(authenticate, isAdmin, returnBook)
router.route("/:id").get(authenticate, isAdmin, getLoanById)

export default router;