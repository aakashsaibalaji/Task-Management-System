import { Task } from "../models/taskModel.js";
import { User } from "../models/userModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, username } = req.body;
    if (!title || !description || !status || !username) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const task = new Task({
      title,
      description,
      status,
      createdby: user._id, // Reference the user's ID
    });
    await task.save();
    return res.status(200).json({
      message: "Task created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

export const gettingAllUserTasks = async (req, res) => {
  try {
    const { username } = req.params;
    const updateUsername = username.trim();
    const user = await User.findOne({ username: updateUsername });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tasks = await Task.find({ createdby: user._id }).populate(
      "createdby"
    );
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    return res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error getting tasks",
      error: error.message,
    });
  }
};

export const updateUserTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!id || !title || !description || !status) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    // Update the task by ID
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

export const deleteUserTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "in_progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed statuses are: ${validStatuses.join(
          ", "
        )}`,
      });
    }
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({
      message: "Task status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating task status",
      error: error.message,
    });
  }
};
