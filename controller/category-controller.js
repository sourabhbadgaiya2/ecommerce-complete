import Category from "../models/category.model.js";


export const create = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (err) {
    console.log(err.message);
  }
};
