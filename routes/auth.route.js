import { Router } from "express";
import { authValidation } from "../validations/index.js";

import validateSchema from "../middlewares/schemaValidation.js";
import {
    handleLogin,
    handleRegister,
} from "../controllers/login.controller.js";

const authRouter = Router();

authRouter.post("/login", validateSchema(authValidation.login), handleLogin);
authRouter.post(
    "/register",
    validateSchema(authValidation.signup),
    handleRegister
);

export { authRouter };
