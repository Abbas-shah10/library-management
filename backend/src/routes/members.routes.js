import express from 'express'
import { createMembers, deleteMemberById, fetchAllMembers, fetchMemberById, updateMembers } from '../controllers/members.controller.js';
import { authenticate, isAdmin } from '../middlewares/authorizeMiddleware.js'
const router = express.Router();

router.route("/").post(authenticate, isAdmin, createMembers).get(authenticate, isAdmin, fetchAllMembers)
router.route("/:memberId").put(authenticate, isAdmin, updateMembers).delete(authenticate, isAdmin, deleteMemberById).get(authenticate, isAdmin, fetchMemberById)



export default router;