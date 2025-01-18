import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      maxlength: [32, "Product name cannot exceed 32 characters."],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Product price is required."],
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
      trim: true,
      maxlength: [2000, "Product description cannot exceed 2000 characters."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required."],
    },
    images: {
      data: Buffer,
      contentType: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
