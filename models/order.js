const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderHistorySchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },
    ],
    productQuantity: [
      {
        type: Number,
        required: [true, "Product quantity is required"],
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;
