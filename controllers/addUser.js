import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_KEY, { expiresIn: "3d" });
};

export const addUser = async (req, res, next) => {
  const { username, email, password, role, mobile_number } = req.body;

  if (req.user.role != "ADMIN") {
    res.status(401).json({
      error: "You are Not Authorized for this Action",
    });
  }

  try {
    const newUser = await User.addUser(
      username,
      email,
      password,
      role,
      mobile_number
    );

    res.status(200).json({
      email: newUser.email,
      message: "User Successfully Added",
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};
