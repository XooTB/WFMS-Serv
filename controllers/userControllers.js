import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_KEY, { expiresIn: "3d" });
};

// Adding a new User to the system

export const addUser = async (req, res) => {
  const { username, email, password, role, mobile_number } = req.body;

  if (req.user.role != "ADMIN") {
    res.status(401).json({
      error: "You are Not Authorized for this Action",
    });
  } else {
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
  }
};

// Removing a user from the system

export const removeUser = async (req, res, next) => {
  const { email } = req.body;

  if (req.user.role != "ADMIN") {
    res.status(401).json({
      error: "You are Not Authorized for this Action",
    });
  } else {
    try {
      const removed = await User.removeUser(email);
      if (removed.status) {
        res.status(200).json(removed);
      }
    } catch (err) {
      res.status(401).json({
        message: err.message,
      });
    }
  }
};

// Loggin in a User

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id, user.role);

    res.status(200).json({
      email: user.email,
      token: token,
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

// List all the Users in the System

export const users = async (req, res, next) => {
  if (req.user.role != "ADMIN") {
    res.status(401).json({
      error: "Request not Authorized",
    });
  } else {
    const users = await User.find().select("-_id -password");
    res.status(200).json({
      users,
    });
  }
};
