import express from "express"
import { authCheck } from "../../middleware/authCheck.middleware.js";
import { createSession, sessionStatus } from "../../controllers/products/order.controller.js";
const paymentRoutes = express.Router();

paymentRoutes.post("/session", authCheck, createSession);
paymentRoutes.post("/session_status/:sessionId", authCheck, sessionStatus);

export default paymentRoutes;