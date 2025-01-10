
import Product from "../models/product.model.js";

export const create = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "product created successfully", product });
  } catch (err) {
    console.log(error.message);
  }
};
