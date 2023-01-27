import express from "express";
import { addOrder, finishOrder } from "../controllers/orderControllers.js";

import {
  getOrders,
  findOrder,
  getLatestOrders,
  getLatestRunningOrders,
  getLatestFinishedOrders,
} from "../controllers/getOrderControllers.js";

import { updateOrder } from "../controllers/updateOrderControllers.js";

const router = express.Router();

router.post("/", (req, res) => {
  res.status(404).json({
    error: "Invalid request.",
  });
});

// New Order
router.post("/new", addOrder);
router.post("/finish/:orderNumber", finishOrder);
router.get("/find/date", getOrders);
router.get("/find/:orderNumber", findOrder);

// Get Latest Orders
router.get("/latest/", getLatestOrders);
router.get("/latest/running", getLatestRunningOrders);
router.get("/latest/finished", getLatestFinishedOrders);

// Update a Order
router.post("/update/:orderNumber", updateOrder);

export default router;
