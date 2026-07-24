import { Router } from 'express'
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js';
import { cancelReservation, createReservation, fetchAllReservation, fetchReservationById, fulfillReservation } from '../controllers/reservation.controller.js';

const router = Router();

router.route("/").post(authenticate, isAdmin, createReservation).get(authenticate, isAdmin, fetchAllReservation)
router.route("/:id").get(authenticate, isAdmin, fetchReservationById);


// actions
router.route("/:id/fulfill").patch(authenticate, isAdmin, fulfillReservation)
router.route("/:id/cancel").patch(authenticate, isAdmin, cancelReservation)

export default router;