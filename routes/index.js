import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { projectRouter } from "./project.route.js";
import { taskRouter } from "./task.route.js";
import { authValidator } from "../middlewares/authValidatior.js";

export const routes = Router();

routes.use("/api/v1", authRouter);
routes.use("/api/v1", authValidator, projectRouter);
routes.use("/api/v1", authValidator, taskRouter);
