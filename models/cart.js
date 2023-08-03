const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 1,
      default: 1,
    },
    total: {
      type: Number,
      required: [true, "Total is required"],
      min: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartItemSchema);
