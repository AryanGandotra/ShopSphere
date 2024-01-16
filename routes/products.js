const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const Cart = require("../models/cart");
const { isLogged } = require("../middleware.js");

router
  .route("/")
  .get(isLogged, async (req, res) => {
    const products = await Products.find({});
    res.render("products/index", { products });
  })
  .post(isLogged, async (req, res) => {
    const newProduct = new Products(req.body.product);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  });

router.route("/new").get(isLogged, (req, res) => {
  res.render("products/new");
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const cart_item = await Cart.find({ product: id });
    const no_of_people = cart_item.length;
    const product = await Products.findById(id);
    res.render("products/show", { product, no_of_people });
  })
  .put(isLogged, async (req, res) => {
    const { id } = req.params;
    const product = await Products.findByIdAndUpdate(id, req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`);
  })
  .delete(isLogged, async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Products.findByIdAndDelete(id);
    console.log(deletedProduct);
    res.redirect("/");
  });

router.route("/:id/edit").get(isLogged, async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.render("products/edit", { product });
});

module.exports = router;
