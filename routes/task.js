import express from 'express';
import { deleteTask, getAllTask, newTask, updateTask } from '../controller/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/tasks/new", isAuthenticated, newTask);

router.get("/tasks/all", isAuthenticated, getAllTask);

router.route("/tasks/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;