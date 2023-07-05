const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
