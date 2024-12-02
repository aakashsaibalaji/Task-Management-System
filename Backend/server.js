import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoutes.js";
import taskRoute from "./Routes/taskRoute.js";
import mongoConnect from "./Database/db.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
mongoConnect();
app.use("/api/auth/v1/user", userRoute);
app.use("/api/auth/v1/task", taskRoute);
app.listen(process.env.PORT, () => {
  console.log("backend server has started at http://localhost:5500");
});
