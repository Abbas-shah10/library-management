import { Router } from 'express'
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js';
import { cancelReservation, createReservation, fetchAllReservation, fetchReservationById, fulfillReservation } from '../controllers/reservation.controller.js';

const router = Router();

router.route("/").post(authenticate, authorize, createReservation).get(authenticate, authorize, fetchAllReservation)
router.route("/:id").get(authenticate, authorize, fetchReservationById);


// actions
router.route("/:id/fulfill").patch(authenticate, authorize, fulfillReservation)
router.route("/:id/cancel").patch(authenticate, authorize, cancelReservation)

export default router;