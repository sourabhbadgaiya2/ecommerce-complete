import Category from "../models/category.model.js";

export const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const categories = await Category.findById(req.params.id);
    if (!categories) {
      return res.status(400).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category found", categories });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category found", categories });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categories = await Category.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!categories) {
      return res.status(400).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category updated successfully", categories });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    if (!categories) {
      return res.status(400).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
