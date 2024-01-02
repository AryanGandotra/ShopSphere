const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderHistorySchema = new Schema(
  {
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: [true, "Cart is required"],
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

orderHistorySchema.virtual("populatedCarts", {
  ref: "Cart",
  localField: "carts",
  foreignField: "_id",
  justOne: false,
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;