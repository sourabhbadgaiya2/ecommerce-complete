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
  } catch (err) {
    console.log(err.message);
  }
};
