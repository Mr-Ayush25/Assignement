import config from "../config/index.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            console.log(`Error at ${new Date().toLocaleString} :`, err);
            res.status(500).json({ message: "Internal Server Error" });
        });
    };
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, config.ACCESS_TOKEN, {
        expiresIn: config.ACCESS_TOKEN_EX,
    });
};

const getObjectId = (id) => {
    return new mongoose.Types.ObjectId(id);
};

const successResponse = (data) => {
    return {
        success: true,
        status: 200,
        data: data,
    };
};

export { asyncHandler, generateToken, successResponse, getObjectId };
