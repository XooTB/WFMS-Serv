import mongoose from "mongoose";

const Schema = mongoose.Schema;

const totalOrderSchema = new Schema({
  totalOrders: {
    type: Number,
    required: true,
    default: 0,
  },
});

totalOrderSchema.statics.increment = async function increment() {
  const document = await this.findOne({});
  if (!document) {
    this.create({ totalOrders: 1 });
  } else {
    document.totalOrders += 1;
    await document.save();
  }
};

totalOrderSchema.statics.count = async function count() {
  const total = await this.findOne({});
  return total.totalOrders;
};

export default mongoose.model("totalOrder", totalOrderSchema);
