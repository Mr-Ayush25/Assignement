import { Task } from "../models/task.model.js";
import { successResponse, asyncHandler, getObjectId } from "../utils/index.js";

const createTask = asyncHandler(async (req, res) => {
    const data = req.body;
    let task = await Task.create(data);

    res.json(successResponse({ task }));
});

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Task id is required" });
    }

    const data = req.body;
    let task = await Task.findOne({ _id: id });

    if (!task || !task._id) {
        return res.status(404).json({ message: "Task not found" });
    }

    task = await Task.findOneAndUpdate({ _id: id }, data, { new: true });

    res.json(successResponse({ task }));
});

const deleteTask = asyncHandler(async (req, res) => {
    let { id: taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({ message: "Task id is required" });
    }
    taskId = getObjectId(taskId);
    console.log(taskId);

    let task = await Task.findOne({ _id: taskId });
    if (!task || !task._id) {
        return res.status(404).json({ message: "Task not found" });
    }

    task = await Task.findOneAndDelete({ _id: taskId });
    res.json(successResponse({ task, message: "Task deleted successfully" }));
});

export { createTask, updateTask, deleteTask };
