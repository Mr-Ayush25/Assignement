import {
    asyncHandler,
    generateToken,
    successResponse,
} from "../utils/index.js";
import { User } from "../models/user.model.js";

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json(successResponse({ token }));
});

const handleRegister = asyncHandler(async (req, res) => {
    const { username, password, email, phone, name = "" } = req.body;

    console.log(username, password, email, phone, name);
    const user = await User.create({
        username,
        password,
        email,
        phone,
        name,
    });

    const token = generateToken(user);
    console.log(token);
    res.json(successResponse({ token }));
});

export { handleLogin, handleRegister };
