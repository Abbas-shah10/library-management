import express from 'express'
import { createMembers, deleteMemberById, fetchAllMembers, fetchMemberById, updateMembers } from '../controllers/members.controller.js';
import { authenticate, authorize } from '../middlewares/authorizeMiddleware.js'
const router = express.Router();

router.route("/").post(authenticate, authorize, createMembers).get(authenticate, authorize, fetchAllMembers)
router.route("/:memberId").put(authenticate, authorize, updateMembers).delete(authenticate, authorize, deleteMemberById).get(authenticate, authorize, fetchMemberById)



export default router;