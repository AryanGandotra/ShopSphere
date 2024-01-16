const express = require("express");
const router = express.Router();
const User = require("../models/user");
const OrderHistory = require("../models/order");

router.route("/:userId").get(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const orderHistory = await OrderHistory.find({ user: userId }).populate({
      path: "products",
    });

    res.render("orderHistory/index", { orderHistory, user });
  } catch (error) {
    console.error("Error while querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
