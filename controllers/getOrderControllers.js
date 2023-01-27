import e from "express";
import { RunningOrder, FinishedOrder } from "../models/orderModel.js";

// Finding order in a Date Range.
//
//
export const getOrders = async (req, res, next) => {
  const { from, to } = req.query;

  if (req.user.role != "ADMIN" && req.user.role != "INV_MANAGER") {
    res.status(401).json({
      message:
        "You are not authorized for this action, please login and try again.",
    });
  } else {
    try {
      const runningOrders = await RunningOrder.getOrders(from, to);
      const finishedOrders = await FinishedOrder.getOrders(from, to);

      res.status(200).json({
        runningOrders,
        finishedOrders,
      });
    } catch (err) {
      res.status(405).json({
        message: err.message,
      });
    }
  }
};
//
//
// Finding order in a Date Range.

// Finding Orders with the Specific Order Number.
//
//
export const findOrder = async (req, res, next) => {
  const orderNumber = req.params.orderNumber;

  if (req.user.role != "ADMIN" && req.user.role != "INV_MANAGER") {
    res.status(401).json({
      message:
        "You are not authorized for this action, please login and try again.",
    });
  } else {
    try {
      let Order = await RunningOrder.findByOrderNumber(orderNumber);
      if (!Order) {
        Order = await FinishedOrder.findByOrderNumber(orderNumber);
      }
      if (!Order) {
        res.status(404).json({
          message: "Order Not Found, Please provide a Valid Order Number.",
        });
      } else {
        res.status(200).json({ Order });
      }
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
};
//
//
// Finding Orders with the Specific Order Number.

// Getting the latest 20 orders
//
//

const validateCount = (count) => {
  if (count) {
    return parseInt(count);
  } else {
    return 20;
  }
};

export const getLatestOrders = async (req, res, next) => {
  let { count } = req.query;
  count = validateCount(count);

  try {
    const Orders = await RunningOrder.find().sort({ _id: -1 }).limit(count);
    res.status(200).json({ Orders });
  } catch (err) {
    res.status(405).json({
      error: err.message,
    });
  }
};

// Getting the latest 20 orders that are Running

export const getLatestRunningOrders = async (req, res, next) => {
  let { count } = req.query;
  count = validateCount(count);

  try {
    const Orders = await RunningOrder.find().sort({ _id: -1 }).limit(count);
    res.status(200).json({ Orders });
  } catch (err) {
    res.status(405).json({
      error: err.message,
    });
  }
};

// Getting the Latest 20 Orders that are Finished

export const getLatestFinishedOrders = async (req, res, next) => {
  let { count } = req.query;
  count = validateCount(count);

  try {
    const Orders = await FinishedOrder.find().sort({ _id: -1 }).limit(count);
    res.status(200).json({ Orders });
  } catch (err) {
    res.status(405).json({
      error: err.message,
    });
  }
};
