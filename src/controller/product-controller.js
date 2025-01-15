import _ from "lodash";
import formidable from "formidable";

import Product from "../models/product.model.js";
import {
  createProduct,
  updateProductById,
} from "../service/product-service.js";

export const productsCreate = async (req, res, next) => {
  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing the form" });
    }

    try {
      // Call the service to create the product
      const product = await createProduct(fields, files);

      res.status(200).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  });
};

export const updateProducts = async (req, res, next) => {
  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing the form" });
    }

    try {
      const productId = req.params.id; // Get the product ID from params
      const updatedProduct = await updateProductById(productId, fields, files); // Call the service function

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  });
};

export const removeProducts = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found. Please check the product ID and try again.",
      });
    }

    res.json({ message: "Product Deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const productsById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found. Please check the product ID and try again.",
      });
    }

    res.json({ message: "Product retrieved successfully.", product });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    // `distinct` se unique categories fetch karo
    const categories = await Product.distinct("category", {});

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const listSearch = async (req, res, next) => {
  try {
    const query = {};

    // Add search condition to query
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" }; // Case-insensitive search
    }

    // Add category condition to query
    if (req.query.category && req.query.category !== "All") {
      query.category = req.query.category;
    }

    // Fetch products based on query
    const products = await Product.find(query).select("-photo");

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
