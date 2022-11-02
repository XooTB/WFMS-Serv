import express from "express";
import { addOrder, deleteOrder } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", (req, res) => {
  res.status(404).json({
    error: "Invalid request.",
  });
});

// New Order
router.post("/new", addOrder);

export default router;
