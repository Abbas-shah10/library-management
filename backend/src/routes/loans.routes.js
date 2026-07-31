import express from 'express'
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js'
import { borrowBook, checkOverdueLoans, getAllLoans, getLoanById, returnBook, sendReminder } from '../controllers/loans.controller.js';
const router = express.Router();

router.route("/").post(authenticate, authorize, borrowBook).get(authenticate, authorize, getAllLoans)
router.route("/check-overdue").post(authenticate, authorize, checkOverdueLoans)
router.route("/:id/reminder").post(authenticate, authorize, sendReminder)
router.route('/:id/return').patch(authenticate, authorize, returnBook)
router.route("/:id").get(authenticate, authorize, getLoanById)

export default router;
