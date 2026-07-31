import express from "express";
import { getReportsOverview } from "../controllers/reports.controller.js";
import { authenticate, authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.route("/overview").get(authenticate, authorize, getReportsOverview)

export default router;
