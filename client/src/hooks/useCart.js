import React from "react";

const useCart = () => {
  const addToCart = (item, next) => {
    let cart = [];

    if (typeof window !== "undefined") {
      // Check if localStorage has a "cart" and parse it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // Add the new item to the cart with a count property
      cart.push({ ...item, count: 1 });

      // Remove duplicates based on the `_id` field
      cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
        return cart.find((p) => p._id === id);
      });

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // If a `next` function is provided, execute it
      if (typeof next === "function") {
        next();
      }
    }
  };

  const itemTotal = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart")).length;
      }
    }
    return 0;
  };

  const getCart = () => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : []; // Only parse if cart exists
    }
    return []; // Return empty array if localStorage is not available
  };

  const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === productId) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const removeItem = (productId) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart = cart.filter((product) => product._id !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart; // Return the updated cart
  };

  const emptyCart = (next) => {
    if (typeof window !== "undefined") {
      // Return the updated cart
      localStorage.removeItem("cart");
      next();
    }
  };

  return { addToCart, itemTotal, getCart, emptyCart, updateItem, removeItem };
};

export default useCart;
