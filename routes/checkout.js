const express = require("express");
const router = express.Router();
const User = require("../models/user");
const OrderHistory = require("../models/order");
const Cart = require("../models/cart");


router.route("/:userId").get(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch the cart items for the user
    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).send("Cart is empty");
    }

    // Create a new order history with the current cart items
    const orderHistory = new OrderHistory({
      products: cartItems.map((cartItem) => cartItem.product),
      productQuantity: cartItems.map((cartItem) => cartItem.quantity),
      user: userId,
    });

    // Save the new order history
    await orderHistory.save();

    // Update the user's order history with the new order
    user.orderHistory.push(orderHistory._id);
    await user.save();

    // Delete cart items
    await Cart.deleteMany({ user: userId });

    // Send response after saving order history
    res.render("checkout/index", { items: cartItems });
  } catch (error) {
    console.error("Error while querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
