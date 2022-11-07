import express from "express";
import { addOrder, finishOrder } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", (req, res) => {
  res.status(404).json({
    error: "Invalid request.",
  });
});

// New Order
router.post("/new", addOrder);
router.post("/finish/:orderNumber", finishOrder);

export default router;
