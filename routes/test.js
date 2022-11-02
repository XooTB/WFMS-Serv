import express from "express";
import { testController } from "../controllers/testController.js";

const router = express.Router();

router.post("/", testController);

export default router;
