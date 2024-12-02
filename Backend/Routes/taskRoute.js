import express from "express";
import {
  createTask,
  deleteUserTask,
  gettingAllUserTasks,
  updateTaskStatus,
  updateUserTask,
} from "../Controllers/taskControllers.js";

const router = express.Router();

router.post("/", createTask);
router.get("/:username", gettingAllUserTasks);
router.put("/update/:id", updateUserTask);
router.delete("/remove/:taskId", deleteUserTask);
router.patch("/status/:taskId", updateTaskStatus);
export default router;
