import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { addUser, removeUser } from "../controllers/userControllers.js";

const router = express.Router();

// SignUp Sections

router.get("/", (req, res) => {
  res.status(404).json({
    error: "Invalid resource",
  });
});

router.post("/add", addUser);
router.post("/remove", removeUser);

export default router;
