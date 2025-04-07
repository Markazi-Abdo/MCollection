import winston from "winston"

export const authLogger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console,
        new winston.transports.File({ filename: "/logs/database/auth.log" })
    ]
})