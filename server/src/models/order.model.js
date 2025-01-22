import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },

    transaction_id: {},
    amount: { type: Number },
    address: String,
    // status: {
    //   type: String,
    //   default: "Not processed",
    //   enum: [
    //     "Not processed",
    //     "Processing",
    //     "Shipped",
    //     "Delivered",
    //     "Cancelled",
    //   ], // enum means string objects
    // },
    updated: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
