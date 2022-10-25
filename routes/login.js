import express from "express";
import { login } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", login);

export default router;
