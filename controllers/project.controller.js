import { Project } from "../models/project.model.js";
import { successResponse, asyncHandler, getObjectId } from "../utils/index.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    let project = await Project.create({
        name,
        description,
        owner: req.user._id,
    });

    res.json(successResponse({ project }));
});

const listAllProjectsWithTask = asyncHandler(async (req, res) => {
    const allProjects = await Project.aggregate([
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "project",
                as: "tasks",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $unwind: "$tasks",
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                owner: { $first: "$owner" },
                description: { $first: "$description" },
                tasks: { $push: "$tasks" },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                tasks: 1,
                owner: {
                    _id: { $arrayElemAt: ["$owner._id", 0] },
                    name: { $arrayElemAt: ["$owner.name", 0] },
                },
            },
        },
    ]);
    if (!allProjects || !allProjects.length) {
        return res.json(successResponse({ allProjects: [] }));
    }

    res.json(successResponse({ allProjects }));
});

const listProjectBasedOnId = asyncHandler(async (req, res) => {
    let { id: projectId } = req.params;

    if (!projectId) {
        return res.status(404).json({ message: "Project not found" });
    }

    const project = await Project.aggregate([
        {
            $match: {
                _id: getObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "project",
                as: "tasks",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
            },
        },
        {
            $unwind: "$tasks",
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                owner: { $first: "$owner" },
                description: { $first: "$description" },
                tasks: { $push: "$tasks" },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                tasks: 1,
                owner: {
                    _id: { $arrayElemAt: ["$owner._id", 0] },
                    name: { $arrayElemAt: ["$owner.name", 0] },
                },
            },
        },
    ]);

    console.log(project);
    if (!project || !project.length) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.json(successResponse({ projects: project }));
});

const projectStats = asyncHandler(async (req, res) => {
    let { id: projectId } = req.params;
    let { status } = req.query;

    if (!projectId) {
        return res.status(404).json({ message: "Invalid project id" });
    }

    const matchStage = {
        _id: getObjectId(projectId),
    };

    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "project",
                as: "tasks",
            },
        },
        ...(status
            ? [
                  {
                      $addFields: {
                          tasks: {
                              $filter: {
                                  input: "$tasks",
                                  as: "task",
                                  cond: { $eq: ["$$task.status", status] },
                              },
                          },
                      },
                  },
              ]
            : []),
        { $unwind: "$tasks" },
        {
            $group: {
                _id: "$tasks.status",
                count: { $sum: 1 },
            },
        },
    ];

    const stats = await Project.aggregate(pipeline);

    if (status) {
        const stat = stats.find((s) => s._id === status);
        return res.json(
            successResponse({ stats: { [status]: stat?.count || 0 } })
        );
    }

    // If no status provided, return all counts
    const formattedStats = {
        Backlog: 0,
        "In Progress": 0,
        Completed: 0,
    };

    stats.forEach(({ _id, count }) => {
        if (formattedStats.hasOwnProperty(_id)) {
            formattedStats[_id] = count;
        }
    });

    res.json(successResponse({ stats: formattedStats }));
});

export {
    createProject,
    listAllProjectsWithTask,
    listProjectBasedOnId,
    projectStats,
};
