import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskUsers",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("TaskManage", TaskSchema);
