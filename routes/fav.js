const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");

router.route("/:userId").get(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate({
    path: "favorites",
  });

  res.render("fav/index", { user });
});

router
  .route("/:userId/:id")
  .post(async (req, res) => {
    const { userId, id } = req.params;
    const currentUser = await User.findById(userId);
    const product = await Product.findById(id);

    if (currentUser.favorites.includes(product._id)) {
      return res.redirect(`/fav/${userId}`);
    } else {
      currentUser.favorites.push(product);
      await currentUser.save();
      res.redirect(`/products/${id}`);
    }
  })
  .delete(async (req, res) => {
    const { userId, id } = req.params;
    const currentUser = await User.findById(userId);
    const product = await Product.findById(id);

    currentUser.favorites.pull(product);
    await currentUser.save();
    res.redirect(`/products`);
  });

module.exports = router;
