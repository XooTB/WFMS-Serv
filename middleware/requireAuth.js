import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  //verify Auth
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      error: "Authorizaion Key Required",
    });
  }

  // Get the Auth Token from the Authorization Header
  const token = authorization.split(" ")[1];

  try {
    const { _id, role } = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findOne({ _id }).select(["_id", "role"]);

    next();
  } catch (err) {
    res.status(401).json({
      error: "Request is Not Authorized",
    });
  }
};
