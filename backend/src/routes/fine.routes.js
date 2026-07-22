import { Router } from 'express'
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js';
import { createFine, getAllFines, getFinesByLoan, getMemberFine, getSingleFine, payAllMemberFines, payFine, waiveFine } from '../controllers/fine.controller.js';

const router = Router();

// CRUD
router.route("/").post(authenticate, isAdmin, createFine)
router.route("/").get(authenticate, isAdmin, getAllFines)
router.route("/:id").get(authenticate, isAdmin, getSingleFine);


// By relationships
router.route("/loan/:loanId").get(authenticate, getFinesByLoan)
router.route('/member/:memberId').get(authenticate, getMemberFine);

// Actions
router.route("/:id/pay").patch(authenticate, isAdmin, payFine);
router.route("/pay-all/:memberId").post(authenticate, isAdmin, payAllMemberFines)
router.route("/:id/waive").delete(authenticate, isAdmin, waiveFine)

export default router;