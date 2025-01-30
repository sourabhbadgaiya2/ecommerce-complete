import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/user.model.js";

// export const createOrderService = async (
//   products,
//   transactionId,
//   amount,
//   userId
// ) => {
//   try {
//     // Step 1: Create the order
//     const order = new Order({ products, transactionId, amount, user: userId });
//     const savedOrder = await order.save();

//     // Step 2: Add order to user's history
//     const history = products.map((item) => ({
//       _id: item._id,
//       name: item.name,
//       description: item.description,
//       stock: item.count,
//       transactionId,
//       amount,
//     }));

//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       { $push: { history: { $each: history } } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       throw new ErrorHandler("User not found", 404);
//     }

//     // Step 3: Decrease product stock and update sold count
//     const bulkOps = products.map((item) => ({
//       updateOne: {
//         filter: { _id: item._id },
//         update: { $inc: { stock: -item.count, sold: item.count } },
//       },
//     }));

//     const bulkWriteResult = await Product.bulkWrite(bulkOps);

//     return { savedOrder, updatedUser, bulkWriteResult };
//   } catch (error) {
//     throw new ErrorHandler(
//       "Error in createOrderService: " + error.message,
//       500
//     );
//   }
// };


export const createOrderService = async (
  products,
  transactionId,
  amount,
  userId
) => {
  try {
    //  Step 1: Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    console.log(products, "Products");

    //  Step 2: Create the order
    const order = new Order({ products, transactionId, amount, user: userId });
    const savedOrder = await order.save();

    //  Step 3: Add order to user's history
    const history = products.map((item) => ({
      _id: item._id, // Ensure correct _id field
      name: item.name,
      description: item.description,
      stock: item.stock, // Corrected property
      transactionId,
      amount,
    }));

    console.log(history, "History");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { history: { $each: history } } },
      { new: true }
    );

    // 🟢 Step 4: Decrease product stock and update sold count
    const bulkOps = products.map((item) => ({
      updateOne: {
        filter: { _id: item.productId }, // Ensure correct _id reference
        update: { $inc: { stock: -item.stock, sold: item.stock } },
      },
    }));

    const bulkWriteResult = await Product.bulkWrite(bulkOps);

    return { savedOrder, updatedUser, bulkWriteResult };
  } catch (error) {
    throw new ErrorHandler(
      "Error in createOrderService: " + error.message,
      500
    );
  }
};
