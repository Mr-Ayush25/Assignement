import dotenv from "dotenv";
dotenv.config();

const config = {
    EXPRESS_PORT: Number(process.env.EXPRESSPORT) || 5001,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EX: process.env.ACCESS_TOKEN_EXPIRY,
    ORIGIN: ["http://localhost:5173"],
};
console.log("Config are logged here :", config);

export default config;
