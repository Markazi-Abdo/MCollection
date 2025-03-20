import express from "express"
const authRoutes = express.Router();

//Routes 
authRoutes.post("/signup")
authRoutes.post("/login")
authRoutes.post("logout")
authRoutes.get("authcheck")

export default authRoutes;