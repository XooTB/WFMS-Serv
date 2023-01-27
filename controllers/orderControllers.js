import { DateTime } from "luxon";
import { RunningOrder, FinishedOrder } from "../models/orderModel.js";
import totalOrder from "../models/totalOrderModel.js";

// Adding a New order to the Running Orders Queue.
//
//
export const addOrder = async (req, res, next) => {
  const { orderDetails, shippingDetails } = req.body;

  if (req.user.role != "ADMIN" && req.user.role != "INV_MANAGER") {
    res.status(401).json({
      message:
        "You are not Authorized for this action, please login and try again.",
    });
  } else {
    const currentDate = DateTime.now().setZone("Asia/Dhaka").toISODate();
    const totalCount = await totalOrder.count();

    // Order Object
    const orderInfo = {
      orderNumber: totalCount + 1,
      details: orderDetails,
      driverName: shippingDetails.driverName,
      delivery_man: shippingDetails.delivery_man,
      van_number: shippingDetails.van_number,
      order_Status: shippingDetails.orderStatus,
      arrival_date: currentDate,
    };

    try {
      // Add the Order to the Database.
      const order = await RunningOrder.new(orderInfo);

      // if Successfull, Increment the total Order Count on the TotalOrders Table.
      await totalOrder.increment();

      res.status(200).json({ order });
    } catch (err) {
      res.status(403).json({
        message: err.message,
      });
    }
  }
};

//
//
// Adding a New order to the Running Orders Queue.

// Marking a Order as Finished and Moving it to the Finished Orders Table.
//
//

export const finishOrder = async (req, res, next) => {
  const orderNumber = req.params.orderNumber;
  const currentDate = DateTime.now().setZone("Asia/Dhaka");

  if (req.user.role != "ADMIN" && req.user.role != "INV_MANAGER") {
    res.status(401).json({
      message:
        "You are not Authorized for this Action, Please login and try again.",
    });
  } else {
    try {
      // Find the Order in the Running Orders Table.
      const Order = await RunningOrder.findByOrderNumber(orderNumber);

      //Make Edits to the Order and mark it as Complete.
      Order.completion_date = currentDate;
      Order.order_Status = "Finished";
      Order.isNew = true;

      // Copy the Order to the Finished Orders Table.
      await FinishedOrder.new(Order);

      // Delete the Order from the Running Orders Table.
      await RunningOrder.remove(orderNumber);

      // Send the Response back.
      res.status(200).json({
        message: `Order Number: ${orderNumber} was successfully Marked as Finished.`,
      });
    } catch (err) {
      res.status(403).json({
        message: err.message,
      });
    }
  }
};

//
//
// Marking a Order as Finished and Moving it to the Finished Orders Table.
