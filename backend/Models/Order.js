import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  order_data: {
    type: Array,
    required: true,
  },
});

const Order = mongoose.model("order", OrderSchema);

export default Order;
