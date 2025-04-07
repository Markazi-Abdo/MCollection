import express from 'express';
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser"
import { connectDatabase } from '../config/dbConnect.js';
import { serverLogger } from '../logs/server/logger.js';
import User from '../model/user.model.js';
import Product from '../model/product.model.js';
import Coupon from '../model/coupon.model.js';
import Order from '../model/order.model.js';
import authRoutes from '../routes/auth/auth.routes.js';
import productRoutes from '../routes/products/product.routes.js';
import cartRoutes from '../routes/products/cart.routes.js';
import couponRoutes from '../routes/products/coupons.routes.js';
import paymentRoutes from '../routes/products/order.routes.js';
import analyticsRoutes from '../routes/products/analytics.routes.js';
const app = express();
dotenv.config();

// app middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit:"5mb" }));
app.use(express.urlencoded({ extended:true, limit:"5mb" }));

// app routes
app.use("/mcollections/auth", authRoutes);
app.use("/mcollections/products", productRoutes);
app.use("/mcollections/cart", cartRoutes);
app.use("/mcollections/coupons", couponRoutes);
app.use("/mcollections/payment", paymentRoutes);
app.use("/mcollections/analytics", analyticsRoutes)

app.listen(process.env.PORT, () => {
    connectDatabase(process.env.MONGO_DB_URI);
    serverLogger.info(`Server fired up, link => http://localhost:${process.env.PORT}/mcollections`);
});