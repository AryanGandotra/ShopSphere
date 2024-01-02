const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orderHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderHistory",
    },
  ],
});

UserSchema.virtual("populatedOrderHistory", {
  ref: "OrderHistory",
  localField: "orderHistory",
  foreignField: "_id",
  justOne: false,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
