import express from "express";
import { addUser, removeUser, users } from "../controllers/userControllers.js";

const router = express.Router();

// SignUp Sections

router.get("/", (req, res) => {
  res.status(404).json({
    error: "Invalid resource",
  });
});

router.post("/add", addUser);
router.post("/remove", removeUser);
router.post("/all", users);

export default router;
