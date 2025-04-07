import express from "express"
import { adminCheck, authCheck } from "../../middleware/authCheck.middleware.js";
import { getData } from "../../controllers/products/analytics.controller.js";
const analyticsRoutes = express.Router();

analyticsRoutes.get("/data", authCheck, adminCheck, getData)

export default analyticsRoutes;