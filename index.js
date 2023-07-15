const express = require("express");
const path = require("path");
const app = express();
const Products = require("./models/product");
require("dotenv").config();
const mongoose = require("mongoose");

const { PORT, DB_CONNECTION_STRING } = process.env;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/", async (req, res) => {
  const products = await Products.find({});
  res.render("home", { products });
});

app.get("/products", async (req, res) => {
  const products = await Products.find({});
  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.render("products/show", { product });
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
  console.log(`http://localhost:${PORT}/products`);
});
