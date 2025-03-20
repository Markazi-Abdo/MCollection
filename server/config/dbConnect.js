import { dbLogger } from "../logs/database/database.js";
import mongoose from "mongoose"

export const connectDatabase = async (uri) => {
    try {
        await mongoose.connect(uri);
        dbLogger.info("Mongo Database succesfully Connected");
    } catch (error) {
        dbLogger.info({ name: error.name, message: error.message, stack: error.stack });
        process.exit(1);
    }
} 