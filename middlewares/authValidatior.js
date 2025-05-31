import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { User } from "../models/user.model.js";

const authValidator = async function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalid" });
    }
};

export { authValidator };
