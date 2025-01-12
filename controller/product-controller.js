import fs from "fs";
import _ from "lodash";
import formidable from "formidable";

import Product from "../models/product.model.js";

export const productCreate = async (req, res, next) => {
  try {
    const form = formidable({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      // console.log(fields, files);

      if (err) {
        return res.status(400).json({ message: "Error parsing the form" });
      }

      // Check if 'images' exists and has a valid filepath
      const imageFile = files.images;
      if (!imageFile || !imageFile[0]?.filepath) {
        return res
          .status(400)
          .json({ message: "No image uploaded or invalid file path" });
      }

      const productData = {
        name: fields.name ? fields.name[0] : "",
        price: fields.price ? parseFloat(fields.price[0]) : 0,
        description: fields.description ? fields.description[0] : "",
        category: fields.category ? fields.category[0] : "",
        stock: fields.stock ? parseInt(fields.stock[0], 10) : 0,
        shipping: fields.shipping ? fields.shipping[0] === "true" : false,
      };

      try {
        // Create a new product
        const product = new Product(productData);

        // Add image data to the product
        product.images.data = fs.readFileSync(imageFile[0].filepath);
        product.images.contentType = imageFile[0].mimetype;

        await product.save();

        res.status(200).json({
          message: "Form data and image uploaded successfully",
          product,
        });
      } catch (saveError) {
        console.error(saveError.message);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const productById = async (req, res, next) => {
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
    console.error("Error fetching product by ID:", error.message);
  }
};

export const removeProduct = async (req, res, next) => {
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
    console.error("Error fetching product by ID:", error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const form = formidable({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: "Error parsing the form" });
      }

      // Find the existing product by ID
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update product fields
      const productData = {
        name: fields.name ? fields.name[0] : product.name,
        price: fields.price ? parseFloat(fields.price[0]) : product.price,
        description: fields.description ? fields.description[0] : product.description,
        category: fields.category ? fields.category[0] : product.category,
        stock: fields.stock ? parseInt(fields.stock[0], 10) : product.stock,
        shipping: fields.shipping ? fields.shipping[0] === "true" : product.shipping,
      };
      

      // Use lodash to merge the updates into the existing product
      product = _.extend(product, productData);

      const imageFile = files.images;
      if (imageFile && imageFile.filepath) {
        product.images.data = fs.readFileSync(imageFile.filepath);
        product.images.contentType = imageFile.mimetype;
      }

      await product.save();

      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
