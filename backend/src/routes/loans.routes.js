import express from 'express'
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js'
import { borrowBook, getAllLoans, getLoanById, returnBook } from '../controllers/loans.controller.js';
const router = express.Router();

router.route("/").post(authenticate, authorize, borrowBook).get(authenticate, authorize, getAllLoans)
router.route('/:id/return').patch(authenticate, authorize, returnBook)
router.route("/:id").get(authenticate, authorize, getLoanById)

export default router;