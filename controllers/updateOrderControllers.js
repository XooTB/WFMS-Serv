import { RunningOrder, FinishedOrder } from "../models/orderModel.js";
//Update a Order

export const updateOrder = async (req, res, next) => {
  const orderNumber = req.params.orderNumber;
  const { updatedOrder } = req.body;

  try {
    // Find the Order from the Running Orders Collection.

    let order = await RunningOrder.findOne({ orderNumber });
    // If the Order is a Running Order then Execute this Block of code.
    if (order) {
      // Update the Order

      await RunningOrder.updateOne({ orderNumber }, { ...updatedOrder });

      //Return a confirmation 200 code.

      res.status(200).json({
        message: "Order Updated Successfully!",
      });

      //
      //
    } else {
      // If the Order is a Finished Order then Execute this block of Code.
      order = await FinishedOrder.findOne({ orderNumber });
      if (!order) {
        throw Error("Order not Found!");
      }

      // If the Finished order is being marked as a Running Order Again exceute this.

      if (updatedOrder.order_Status == "Running") {
        let newRunningOrder = Object.assign(order, updatedOrder);
        newRunningOrder = newRunningOrder.toObject();
        delete newRunningOrder.completion_date;
        delete newRunningOrder._id;

        // Transfer the Order to the Running Orders Table.
        await RunningOrder.new(newRunningOrder);

        // Remove the Finished order from the Finished Order Table.
        await FinishedOrder.remove(orderNumber);

        // Return the status 200 and A message.
        res.status(200).json({
          message: "Order was Successfully updated and marked as Running.",
        });
      } else {
        // If the Status of the Order isn't updated, then Exectue this block of code.

        await FinishedOrder.updateOne({ orderNumber }, { ...updatedOrder });

        res.status(200).json({
          message: "Order Updated",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
