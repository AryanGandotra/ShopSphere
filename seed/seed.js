const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
require("dotenv").config();
const { array } = require("./array");

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Product.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const product = new Product({
      name: array[i].title,
      price: Math.floor(Math.random() * 20) + 10,
      description: array[i].description,
      imageUrl: array[i].image,
      quantity: 50,
      category: array[i].category,
    });
    await product.save();
  }
};

const seedUser = async () => {
  await User.deleteMany({});
};

const seedCart = async () => {
  await Cart.deleteMany({});
};

seedUser();
seedCart();

seedDB().then(() => {
  mongoose.connection.close();
});
