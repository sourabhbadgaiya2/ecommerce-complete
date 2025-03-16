import Cart from "../models/cart.model.js";

// ✅ Fetch User's Cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id }).populate(
//       "items.productId"
//     );
//     res.json(cart || { items: [] });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ✅ Add Item to Cart
// export const addToCart = async (req, res) => {
//   try {
//     const { productId, name, price, quantity } = req.body;
//     console.log(productId, name, price, quantity);

//     let cart = await Cart.findOne({ userId: req.user._id });

//     if (!cart) {
//       cart = new Cart({ userId: req.user._id, items: [] });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.productId.toString() === productId
//     );
//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, name, price, quantity });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // ✅ Remove Item from Cart
// export const removeFromCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOneAndUpdate(
//       { userId: req.user.id },
//       { $pull: { items: { productId: req.params.productId } } },
//       { new: true }
//     );
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// 🛒 **Get Cart Items**
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ➕ **Add Item to Cart**
export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ **Remove Item**
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { productId: req.params.productId } } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update Item Quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) item.quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
