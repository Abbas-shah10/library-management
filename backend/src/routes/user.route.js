import express from 'express'
import { loginUser, registerUser, logoutUser, fetchAllUsers } from '../controllers/user.controller.js';
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js'
const router = express.Router();

router.route("/").post(registerUser).get(authenticate, isAdmin, fetchAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

export default router
