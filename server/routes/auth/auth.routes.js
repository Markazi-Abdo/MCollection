import express from "express";
import { refreshTokenController, loginController, logoutController, signUpController, getProfile } from "../../controllers/auth/auth.controller.js";
import { authCheck } from "../../middleware/authCheck.middleware.js";
const authRoutes = express.Router();

//Routes 
authRoutes.post("/signup", signUpController);
authRoutes.post("/login" , loginController);
authRoutes.post("/logout", logoutController);
authRoutes.post("/refreshtoken", refreshTokenController);
authRoutes.get("/profile", authCheck,getProfile)

export default authRoutes;