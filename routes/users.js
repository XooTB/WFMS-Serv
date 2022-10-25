import express from "express";
import { addUser } from "../controllers/addUser.js";
import { removeUser } from "../controllers/removeUser.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// SignUp Sections

router.use(requireAuth);

router.get("/", (req, res) => {
  res.status(404).json({
    error: "Invalid resource",
  });
});

router.post("/add", addUser);
router.post("/remove", removeUser);

export default router;
