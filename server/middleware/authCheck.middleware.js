import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model.js";

export const authCheck = async function(req, res, next){
    try {
        const token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({ success:false, message:"Couldn't get token" });
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if(!decode){
            return res.status(404).json({ success:false, message:"Invalid token" });
        }

        const validateUser = await User.findById(decode.userId).select("-password");
        if(!validateUser){
            return res.status(400).json({ success:false, message:"Couldn't find user" });
        }

        req.user = validateUser;
        next();
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const adminCheck = function(req, res, next){
    if(req.user && req.user.role === "admin"){
        next();
    } else {
        return res.status(403).json({ success:false, message: "Unauthorized, admin only" });
    }
}