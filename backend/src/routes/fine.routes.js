import { Router } from 'express'
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js';
import { createFine, getAllFines, getFinesByLoan, getMemberFine, getSingleFine, payAllMemberFines, payFine, waiveFine } from '../controllers/fine.controller.js';

const router = Router();

// CRUD
router.route("/").post(authenticate, authorize, createFine)
router.route("/").get(authenticate, authorize, getAllFines)
router.route("/:id").get(authenticate, authorize, getSingleFine);


// By relationships
router.route("/loan/:loanId").get(authenticate, getFinesByLoan)
router.route('/member/:memberId').get(authenticate, getMemberFine);

// Actions
router.route("/:id/pay").patch(authenticate, authorize, payFine);
router.route("/pay-all/:memberId").post(authenticate, authorize, payAllMemberFines)
router.route("/:id/waive").delete(authenticate, authorize, waiveFine)

export default router;