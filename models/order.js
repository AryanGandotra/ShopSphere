const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderHistorySchema = new Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const orderHistorySchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   order_date: { type: Date, default: Date.now },
//   total_amount: Number,
//   items: [itemSchema],
//   shipping_address: {
//     address_line1: String,
//     address_line2: String,
//     city: String,
//     state: String,
//     postal_code: String,
//     country: String,
//   },
//   payment_info: {
//     payment_method: String,
//     transaction_id: String,
//     payment_status: String,
//     payment_date: Date,
//   },
//   order_status: String,
//   shipment_tracking: String,
//   order_notes: [noteSchema],
// });

// module.exports = mongoose.model("OrderHistory", orderHistorySchema);
