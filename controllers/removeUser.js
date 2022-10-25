import User from "../models/userModel.js";

export const removeUser = async (req, res, next) => {
  const { email } = req.body;

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
};
