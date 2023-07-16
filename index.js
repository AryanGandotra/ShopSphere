const express = require("express");
const path = require("path");
const app = express();
const Products = require("./models/product");
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const { PORT, DB_CONNECTION_STRING } = process.env;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));
app.use(methodOverride("_method"));

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

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const newProduct = new Products(req.body.product);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Products.findByIdAndUpdate(id, req.body.product);
  await product.save();
  res.redirect(`/products/${product._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.render("products/show", { product });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Products.findByIdAndDelete(id);
  console.log(deletedProduct);
  res.redirect("/");
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.render("products/edit", { product });
});

app.get("/login", (req, res) => {
  res.render("Auth/login");
});

app.get("/signUp", (req, res) => {
  res.render("Auth/signUp");
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
