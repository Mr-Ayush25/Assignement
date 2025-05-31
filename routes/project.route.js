import { Router } from "express";
import { projectValidation } from "../validations/index.js";

import validateSchema from "../middlewares/schemaValidation.js";
import {
    createProject,
    listAllProjectsWithTask,
    listProjectBasedOnId,
    projectStats,
} from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post(
    "/projects",
    validateSchema(projectValidation.createProject),
    createProject
);
projectRouter.get("/projects", listAllProjectsWithTask);
projectRouter.get("/projects/:id", listProjectBasedOnId);
projectRouter.get("/projects/:id/stats", projectStats);

export { projectRouter };
