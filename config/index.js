import dotenv from "dotenv";
dotenv.config();

export const config = {
    EXPRESS_PORT: Number(process.env.EXPRESSPORT) || 5001,
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EX: process.env.ACCESS_TOKEN_EXPIRY,
    ORIGIN: ["http://localhost:5173"],
};
console.log("Config are logged here :", config);
