import express from 'express';
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { connectDatabase } from '../config/dbConnect.js';
import { serverLogger } from '../logs/server/logger.js';
const app = express();
dotenv.config();

// app middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(helmet());
app.use(cors());

app.listen(process.env.PORT, ()=>{
    connectDatabase(process.env.MONGO_DB_URI);
    serverLogger.info(`Server fired up, link => http://localhost:${process.env.PORT}`);
})