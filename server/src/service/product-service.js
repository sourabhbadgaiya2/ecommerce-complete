import fs from "fs";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createProduct = async (fields, files) => {
  // Check if 'images' exists and has a valid filepath
  const imageFile = files.images;
  if (!imageFile || !imageFile[0]?.filepath) {
    throw new ErrorHandler("No image uploaded or invalid file path");
  }

  // Prepare product data
  const productData = {
    name: fields.name ? fields.name[0] : "",
    price: fields.price ? parseFloat(fields.price[0]) : 0,
    description: fields.description ? fields.description[0] : "",
    category: fields.category ? fields.category[0] : "",
    stock: fields.stock ? parseInt(fields.stock[0], 10) : 0,
    shipping: fields.shipping ? fields.shipping[0] === "true" : false,
  };

  const product = new Product(productData);

  // Add image data to the product
  product.images.data = fs.readFileSync(imageFile[0].filepath);
  product.images.contentType = imageFile[0].mimetype;

  await product.save();

  return product;
};

export const updateProductById = async (productId, fields, files) => {
  // Find the existing product by ID
  let product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found");
  }

  // Prepare product data to update
  const productData = {
    name: fields.name ? fields.name[0] : product.name,
    price: fields.price ? parseFloat(fields.price[0]) : product.price,
    description: fields.description
      ? fields.description[0]
      : product.description,
    category: fields.category ? fields.category[0] : product.category,
    stock: fields.stock ? parseInt(fields.stock[0], 10) : product.stock,
    shipping: fields.shipping
      ? fields.shipping[0] === "true"
      : product.shipping,
  };

  // Merge updated fields into the existing product
  product = _.extend(product, productData);

  // Check if there is an image file to update
  const imageFile = files.images;
  if (imageFile && imageFile.filepath) {
    product.images.data = fs.readFileSync(imageFile.filepath);
    product.images.contentType = imageFile.mimetype;
  }

  // Save the updated product to the database
  await product.save();

  return product; // Return the updated product
};
