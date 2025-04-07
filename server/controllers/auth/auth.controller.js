import { exportCookies, generateToken, storeRefreshToken } from "../../libs/jwt.js";
import { serverLogger } from "../../logs/server/logger.js"
import User from "../../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { redis } from "../../libs/redis.js";
dotenv.config();

export const signUpController = async (req, res) => {
    try {
        const{ fullname, username, email, password } = req.body;
        serverLogger.info("Signing up: ", fullname);

        if(!fullname || !username || !email || !password){
            return res.status(400).json({ success:false, message:"All fields should be filled" })
        }

        const findUserName = await User.findOne({ username });
        if(findUserName){
            return res.status(404).json({ success:false, message:"Username already exists" });
        }
        const findEmail = await User.findOne({ email });
        if(findEmail){
            return res.status(404).json({ success:false, message:"Email already exists" });
        }
        
        const user = new User({
            fullname,
            username,
            email,
            password
        });
        await user.save();

        const { accessToken, refreshToken } = generateToken(user._id);
        await storeRefreshToken(user._id, refreshToken);
        exportCookies(res, accessToken, refreshToken)

        user.password = null;
        return res.status(201).json({ success:true, message:`${username} signedUp`, user });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        serverLogger.info("Login started");
        if(!username || !password){
            return res.status(404).json({ success:false, message:"Fields shouldn't be empty" });
        }

        const findUserName = await User.findOne({ username });
        if(!findUserName){
            return res.status(404).json({ success:false, message: "Invalid credenatials" });
        }
        const validPassword = await findUserName.validatePassword(password);
        if(!validPassword){
            return res.status(404).json({ success:false, message:"Invalid Credentials" });
        }

        const { accessToken, refreshToken } = generateToken(findUserName._id);
        await storeRefreshToken(findUserName._id, refreshToken);
        exportCookies(res, accessToken, refreshToken);

        findUserName.password = null;
        return res.status(200).json({ success:true, message:`${findUserName.username} loggedin succesfully`, user:findUserName})
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message})
    }
}

export const logoutController = async (req, res) => {
    try {
        const cookie = req.cookies.refreshToken;
        if(!cookie){
            return res.status(404).json({ success:false, message:"No tokan provided" });
        }
        const decodeToken = jwt.verify(cookie, process.env.REFRESH_TOKEN_KEY);
        if(!decodeToken){
            return res.status(404).json({ success:false, message:"False token" });
        }

        await redis.del(`refresh_token:${decodeToken?.userId}`);

        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

        return res.status(202).json({ success:true, message: `User loggedOut succesfully`})
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    }
}

export const refreshTokenController = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(404).json({ success:false, message:"Couldn't find token" });
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
        if(!decodedToken){
            return res.status(404).json({ success:false, message:"Invalid Token" });
        }

        const storedTokenRedis = await redis.get(`refresh_token:${decodedToken?.userId}`);
        if(!storedTokenRedis){
            return res.status(404).json({ success:false, message:"Couldn't get token from database" });
        }
        
        if(storedTokenRedis !== token){
            return res.status(401).json({ success:false, message:"Invalid Token" });
        }

        const newAccessToken = jwt.sign({ userId: decodedToken.userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
        res.cookie("accessToken", newAccessToken, {
            maxAge:15*60*1000,
            sameSite: 'strict',
            httpOnly: true
        })

        return res.status(200).json({ success:true, message: "Token refreshed succesfully" });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message })
    } 
}

export const getProfile = async function(req, res){
    try {
        const user = req.user._id;
        if(!user){
            return res.status(403).json({ succe:false, message:"Info not provided from token" })
        }
        const findUser = await User.findById(user).select("-password");
        if(!findUser){
            return res.status(404).json({ success:false, message:"User not found" });
        }

        return res.status(200).json({ success:true, meesage:"User found", user:findUser });
    } catch (error) {
        dbLogger.info("Error: " +error.name + " was found at " + error.trace);
        return res.status(500).json({ success:false, message:error.message });
    }
}

