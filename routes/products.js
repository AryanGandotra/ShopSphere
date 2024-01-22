const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const Cart = require("../models/cart");
const { isLogged } = require("../middleware.js");
const cloudinary = require("cloudinary").v2;
const cloud_name = process.env.Cloudinary_Cloud_Name;
const api_key = process.env.Cloudinary_API_key;
const api_secret = process.env.Cloudinary_API_secret;
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

router
  .route("/")
  .get(isLogged, async (req, res) => {
    const products = await Products.find({});
    res.render("products/index", { products });
  })
  .post(async (req, res) => {
    try {
      const files = req.files;
      console.log(files);
      console.log(req.body);

      const name = req.body["product[name]"];
      const category = req.body["product[category]"];
      const quantity = req.body["product[quantity]"];
      const description = req.body["product[description]"];
      const price = req.body["product[price]"];

      const newProduct = new Products({
        name: name,
        category: category,
        description: description,
        price: price,
        quantity: quantity,
      });

      const result = await cloudinary.uploader.upload(
        files.photo.tempFilePath,
        {
          folder: "Products",
        }
      );
      newProduct.imageUrl = result.secure_url;

      await newProduct.save();
      res.redirect(`/products/${newProduct._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
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
