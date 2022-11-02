import { Running } from "../models/orderModel.js";

export const addOrder = async (req, res, next) => {
  const { orderDetails, shippingDetails } = req.body;
  const currentDate = new Date().toJSON().slice(0, 10);

  const orderInfo = {
    details: orderDetails,
    driverName: shippingDetails.driverName,
    delivery_man: shippingDetails.delivery_man,
    van_number: shippingDetails.van_number,
    order_Status: shippingDetails.orderStatus,
    arrival_date: currentDate,
  };

  try {
    const order = await Running.newOrder(orderInfo);

    res.status(200).json({ order });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

export const deleteOrder = (req, res, next) => {
  res.status(200).json({
    message: "Order Deleted",
  });
};
