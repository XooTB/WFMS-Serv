import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

// The Order Schema.
//
//
const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    required: false,
  },
  details: {
    factoryName: {
      type: String,
      required: true,
    },
    styleNumber: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    quanitity: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      default: function () {
        return this.details.quanitity * this.details.rate;
      },
    },
  },
  driverName: {
    type: String,
    required: true,
  },
  delivery_man: {
    type: String,
    required: false,
  },
  van_number: {
    type: String,
    required: true,
  },
  order_Status: {
    type: String,
    default: "Running",
  },
  arrival_date: {
    type: Date,
    required: true,
  },
  completion_date: {
    type: Date,
    required: false,
  },
});

//
//
// The Order Schema.

// Create a New Order.

orderSchema.statics.new = async function newOrder(orderInfo) {
  const Order = await this.create(orderInfo);
  if (!Order) {
    throw Error(
      "Something Went wrong while creating the Order. Please Try again. "
    );
  }
  return Order;
};

// Find a Order from the Tables.
orderSchema.statics.findByOrderNumber = async function find(orderNumber) {
  if (!orderNumber) {
    throw Error("Please Provide a valid Order Number.");
  }
  const Order = await this.findOne({ orderNumber }).select("-_id");
  if (!Order) {
    return null;
  }
  return Order;
};

// Remove the Orders from the Table.
orderSchema.statics.remove = async function remove(orderNumber) {
  const Order = await this.findOne({ orderNumber });
  if (!Order) {
    throw Error("Order Not Found, Please enter the correct Order Number.");
  }
  await Order.deleteOne();
  return true;
};

// Finding the Orders within a Date Range.

orderSchema.statics.getOrders = async function getOrders(startDate, endDate) {
  const Orders = await this.find({
    arrival_date: { $gte: startDate, $lte: endDate },
  }).select("-_id");

  if (!Orders) {
    return null;
  }
  return Orders;
};

// Convert the Schema into Models.
//
//
const Order = mongoose.model("Order", orderSchema);
const RunningOrder = mongoose.model("Running_Order", orderSchema);
const FinishedOrder = mongoose.model("Finished_Order", orderSchema);

// export the Models.
export { Order, RunningOrder, FinishedOrder };
