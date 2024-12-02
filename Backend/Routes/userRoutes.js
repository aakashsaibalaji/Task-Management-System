import express from "express";
import {
  checkValidUsername,
  singleUserDetails,
  updateUser,
  userCreate,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/", userCreate);
router.get("/:email", singleUserDetails);
router.put("/update/:email", updateUser);
router.post("/check/", checkValidUsername);

export default router;
