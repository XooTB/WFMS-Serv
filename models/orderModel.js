import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

orderSchema.statics.newOrder = async function newOrder(orderInfo) {
  const Order = await this.create(orderInfo);

  return Order;
};

const Order = mongoose.model("Order", orderSchema);
const Running = mongoose.model("Running", orderSchema);

export { Order, Running };
