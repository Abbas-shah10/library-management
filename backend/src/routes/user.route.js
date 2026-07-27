import express from 'express'
import { loginUser, registerUser, logoutUser, refreshTokenUser, fetchAllUsers } from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js'
const router = express.Router();

router.route("/").post(registerUser).get(authenticate, authorize, fetchAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/refresh").post(refreshTokenUser)

export default router
