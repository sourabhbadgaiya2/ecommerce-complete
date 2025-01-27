import Order from "../models/order.model.js";
import { createOrderService } from "../service/order-service.js";

export const createOrder = async (req, res, next) => {
  try {
    const { products, transactionId, amount } = req.body;
    const userId = req.user._id;

    // Call the service
    const { savedOrder, updatedUser, bulkWriteResult } =
      await createOrderService(products, transactionId, amount, userId);

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
      user: updatedUser,
      productUpdates: bulkWriteResult,
    });
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    next(error);
  }
};

// Admin only
export const allOrderList = async (req, res, next) => {
  try {
    const list = await Order.find()
      .populate("user", "_id name address")
      .sort("-created"); // sort by date
    // console.log(list, "list");

    res.status(201).json({
      message: "all order list read",
      list,
    });
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    next(error);
  }
};
