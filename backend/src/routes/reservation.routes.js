import { Router } from 'express'
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js';
import { createReservation, fetchAllReservation, fetchReservationById } from '../controllers/reservation.controller.js';

const router = Router();

router.route("/").post(authenticate, isAdmin, createReservation).get(authenticate, isAdmin, fetchAllReservation)
router.route("/:id").get(authenticate, isAdmin, fetchReservationById);

export default router;