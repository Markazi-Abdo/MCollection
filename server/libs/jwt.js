import { serverLogger } from "../logs/server/logger.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "./redis.js";
dotenv.config();

export const generateToken = ( userId ) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "14d" });

    return { accessToken, refreshToken };
}

export const storeRefreshToken = async function(userId, refreshToken){
    return await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 14*24*60*60);
}

export const exportCookies = function(res, accessToken, refreshToken){
    res.cookie("accessToken", accessToken, {
        maxAge: 60*60*1000,
        httpOnly: true,
        sameSite: 'strict',
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 14*24*60*60*1000,
        httpOnly: true,
        sameSite: 'strict',
    })
}