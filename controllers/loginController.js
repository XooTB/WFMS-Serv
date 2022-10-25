import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_KEY, { expiresIn: "3d" });
};

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
