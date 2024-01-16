const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");


router.route("/:userId").get(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const cart = await Cart.find({ user: userId })
    .populate({
      path: "product",
    })
    .populate({
      path: "user",
    });
  res.render("cart/index", { cart, user });
});

router.route("/:userId/:id").post(async (req, res) => {
  const { userId, id } = req.params;
  const { quantity } = req.body;

  const currentUser = await User.findById(userId);
  const product = await Product.findById(id);

  const cartItem = await Cart.findOne({ product: id, user: userId });

  if (cartItem) {
    cartItem.quantity += parseInt(quantity, 10);
    await cartItem.save();
  } else {
    const newCartItem = new Cart({
      product: product,
      quantity: parseInt(quantity, 10),
      user: userId,
    });
    await newCartItem.save();
    currentUser.products.push(newCartItem);
    await currentUser.save();
  }

  product.quantity -= parseInt(quantity, 10);
  await product.save();

  res.redirect(`/cart/${userId}`);
});

module.exports = router;
