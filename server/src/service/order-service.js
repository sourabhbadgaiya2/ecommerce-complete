import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/user.model.js";

export const createOrderService = async (
  products,
  transactionId,
  amount,
  userId
) => {
  try {
    // Step 1: Create the order
    const order = new Order({ products, transactionId, amount, user: userId });
    const savedOrder = await order.save();

    // Step 2: Add order to user's history
    const history = products.map((item) => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      stock: item.count,
      transactionId,
      amount,
    }));

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { history: { $each: history } } },
      { new: true }
    );

    if (!updatedUser) {
      throw new ErrorHandler("User not found", 404);
    }

    // Step 3: Decrease product quantity and update sold count
    const bulkOps = products.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { stock: -item.count, sold: item.count } },
      },
    }));

    const bulkWriteResult = await Product.bulkWrite(bulkOps);

    return { savedOrder, updatedUser, bulkWriteResult };
  } catch (error) {
    next(error);
  }
};

