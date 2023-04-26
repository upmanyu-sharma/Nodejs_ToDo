import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const user = req.user;

        if (!user) return next(new errorHandler("Login first", 405));

        const task = await Task.create({
            title,
            description,
            user,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new errorHandler("Task not found", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated!",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new errorHandler("Task not found", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted!",
        });
    } catch (error) {
        next(error);
    }
};
