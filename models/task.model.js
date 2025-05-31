import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["Backlog", "In Progress", "Completed"],
        default: "Backlog",
    },
},{
    timestamps: true
});

export const Task = mongoose.model("Task", taskSchema);
