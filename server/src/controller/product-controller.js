import _ from "lodash";
import formidable from "formidable";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;
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

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });
};

// export const updateProducts = async (req, res, next) => {
//   const form = formidable({ keepExtensions: true });

//   console.log(form, "Form Data");

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({ message: "Error parsing the form" });
//     }

//     try {
//       const productId = req.params.id; // Get the product ID from params
//       const updatedProduct = await updateProductById(productId, fields, files); // Call the service function

//       res.status(200).json({
//         message: "Product updated successfully",
//         product: updatedProduct,
//       });
//     } catch (error) {
//       console.log(error.message);
//       next(error);
//     }
//   });
// };

export const updateProducts = async (req, res, next) => {
  const form = formidable({ keepExtensions: true });

  // console.log("📥 Incoming Form Data...");

  form.parse(req, async (err, fields, files) => {
    if (err) {
      // console.error("❌ Form Parsing Error:", err);
      return res.status(400).json({ message: "Error parsing the form" });
    }

    // 🛠 Debugging: Check what data is coming in fields & files
    // console.log("🔹 Fields:", fields);
    // console.log("📂 Files:", files);

    try {
      const productId = req.params.id; // Get the product ID from params

      // 🛠 Debugging: Check if productId is valid
      // console.log("🆔 Product ID:", productId);

      const updatedProduct = await updateProductById(productId, fields, files); // Call the service function

      console.log("✅ Product Updated:", updatedProduct);

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("❌ Update Product Error:", error.message);
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
    console.log(error.message);
    next(error);
  }
};

export const productsById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .select("-images");

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found. Please check the product ID and try again.",
      });
    }

    res.json({ message: "Product retrieved successfully.", product });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find()
      .select("-images")
      .populate("category");
    res
      .status(200)
      .json({ message: "Products list fetched successfully!", products });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const showImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Check karo agar product ki photo ki data property exist karti hai
    if (product.images?.data) {
      res.setHeader("Content-Type", product.images.contentType);

      return res.status(200).send(product.images.data);
    }

    res.status(404).json({ message: "Photo not found." });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    // `distinct` se unique categories fetch karo
    const categories = await Product.distinct("category", {});

    res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const listSearch = async (req, res, next) => {
  try {
    const query = {};

    // Search text
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" }; // Case-insensitive search
    }

    // Category condition
    if (req.query.category && req.query.category !== "All") {
      if (ObjectId.isValid(req.query.category)) {
        query.category = new ObjectId(req.query.category); // Convert to ObjectId
      } else {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    // Query execute
    const products = await Product.find(query)
      .populate("category")
      .select("-images");

    // console.log(products)

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};
