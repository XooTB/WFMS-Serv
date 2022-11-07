import { DateTime } from "luxon";
import { RunningOrder, FinishedOrder } from "../models/orderModel.js";
import totalOrder from "../models/totalOrderModel.js";

export const addOrder = async (req, res, next) => {
  const { orderDetails, shippingDetails } = req.body;
  const currentDate = DateTime.now().setZone("Asia/Dhaka").toISO();
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
};

export const finishOrder = async (req, res, next) => {
  const orderNumber = req.params.orderNumber;
  const currentDate = DateTime.now().setZone("Asia/Dhaka").toISO();

  try {
    // Find the Order in the Running Orders Table.
    const Order = await RunningOrder.find(orderNumber);

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
};
