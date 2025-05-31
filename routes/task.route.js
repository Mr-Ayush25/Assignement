import { Router } from "express";
import { taskValidation } from "../validations/index.js";
import {
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";

import validateSchema from "../middlewares/schemaValidation.js";

const taskRouter = Router();

taskRouter.post(
    "/tasks",
    validateSchema(taskValidation.createTask),
    createTask
);
taskRouter.put(
    "/tasks/:id",
    validateSchema(taskValidation.createTask),
    updateTask
);
taskRouter.delete("/tasks/:id", deleteTask);

export { taskRouter };
