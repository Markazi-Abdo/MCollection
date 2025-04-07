import express from "express"
import { authCheck } from "../../middleware/authCheck.middleware.js";
import { getCouponForUser, validateCoupon } from "../../controllers/products/coupon.controller.js";
const couponRoutes = express.Router();

couponRoutes.get("/coupon", authCheck, getCouponForUser);
couponRoutes.post("/validate/:code", authCheck, validateCoupon);

export default couponRoutes;