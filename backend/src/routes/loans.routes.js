import express from 'express'
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js'
import { borrowBook } from '../controllers/loans.controller.js';
const router = express.Router();

router.route("/").post(authenticate, isAdmin, borrowBook)

export default router;