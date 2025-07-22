import {
    asyncHandler,
    generateToken,
    successResponse,
} from "../utils/index.js";
import { User } from "../models/user.model.js";

const handleLogin = asyncHandler(async (req, res) => {
    res.json(successResponse({ token }));
});


const handleRegister = asyncHandler(async (req, res) => {

    res.json(successResponse({ token }));
});

export { handleLogin, handleRegister };
