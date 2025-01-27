// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema(
//   {
//     products: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//     },
//     name: String,
//     price: Number,
//     count: Number,
//   },
//   { timestamps: true }
// );

// const Cart = mongoose.model("Cart", cartSchema);

// export default Cart;
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who owns the cart
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Product reference
        name: String,
        price: Number,
        count: { type: Number, required: true }, // Quantity of product
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
