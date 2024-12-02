import { User } from "../models/userModel.js";

export const userCreate = async (req, res) => {
  try {
    const { fullname, username, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const user = new User({ fullname, username, email });
    const savedUser = await user.save();
    res.status(200).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const singleUserDetails = async (req, res) => {
  try {
    const { email } = req.params;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { fullname, username } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkValidUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).json({
        message: "Valid username",
        isValid: true,
      });
    }
    return res.status(404).json({
      message: "Invalid username. No user found with this username",
      isValid: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error checking username",
      error: error.message,
    });
  }
};
