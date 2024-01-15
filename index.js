const express = require("express");
const path = require("path");
const app = express();
const Products = require("./models/product");
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Cart = require("./models/cart");
const { isLogged, storeReturnTo, login } = require("./middleware");
const Product = require("./models/product");
const OrderHistory = require("./models/order");

const { PORT, DB_CONNECTION_STRING } = process.env;

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true, // only works on https
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // how to store user in session
passport.deserializeUser(User.deserializeUser()); // how to get user out of session

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user; // req.user is defined by passport
  next();
});

app.get("/", async (req, res) => {
  const products = await Products.find({});
  res.render("home", { products });
});

app.get("/products", isLogged, async (req, res) => {
  const products = await Products.find({});
  res.render("products/index", { products });
});

app.get("/products/new", isLogged, (req, res) => {
  res.render("products/new");
});

app.post("/products", isLogged, async (req, res) => {
  const newProduct = new Products(req.body.product);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.put("/products/:id", isLogged, async (req, res) => {
  const { id } = req.params;
  const product = await Products.findByIdAndUpdate(id, req.body.product);
  await product.save();
  res.redirect(`/products/${product._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const cart_item = await Cart.find({ product: id });
  const no_of_people = cart_item.length;
  const product = await Products.findById(id);
  res.render("products/show", { product, no_of_people });
});

app.delete("/products/:id", isLogged, async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Products.findByIdAndDelete(id);
  console.log(deletedProduct);
  res.redirect("/");
});

app.get("/products/:id/edit", isLogged, async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.render("products/edit", { product });
});

app.get("/login", (req, res) => {
  res.render("Auth/login");
});

app.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", { failureRedirect: "/login" }),
  login
);

app.get("/signUp", (req, res) => {
  res.render("Auth/signUp");
});

app.post("/signUp", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.redirect("/signUp");
    }
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (e) {
    res.redirect("/signUp");
  }
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const cart = await Cart.find({ user: userId })
    .populate({
      path: "product",
    })
    .populate({
      path: "user",
    });
  res.render("cart/index", { cart, user });
});

// app.post("/cart/:userId/:id", async (req, res) => {
//   const { userId, id } = req.params;
//   const { quantity } = req.body;
//   const currentUser = await User.findById(userId);
//   const product = await Product.findById(id);
//   const cartItem = new Cart({
//     product: product,
//     quantity: quantity,
//     user: userId,
//   });

//   product.quantity = product.quantity - quantity;
//   console.log(quantity);
//   console.log(product.quantity);
//   await product.save();

//   currentUser.products.push(cartItem);
//   await cartItem.save();
//   await currentUser.save();
//   res.redirect(`/cart/${userId}`);
// });

app.post("/cart/:userId/:id", async (req, res) => {
  const { userId, id } = req.params;
  const { quantity } = req.body;
  const currentUser = await User.findById(userId);
  const product = await Product.findById(id);

  const cartItem = await Cart.findOne({ product: id, user: userId });

  if (cartItem) {
    cartItem.quantity += parseInt(quantity, 10);
    await cartItem.save();
  } else {
    const newCartItem = new Cart({
      product: product,
      quantity: parseInt(quantity, 10),
      user: userId,
    });
    await newCartItem.save();
    currentUser.products.push(newCartItem);
    await currentUser.save();
  }

  product.quantity -= parseInt(quantity, 10);
  await product.save();

  res.redirect(`/cart/${userId}`);
});

// app.get("/cart/:id", isLogged, async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.render("cart/index", { user });
// });

// app.get("/checkout/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const user = await Cart.findById(userId);
//   res.send(user);
//   // res.render("checkout/index", { userId });
// });

app.get("/orderHistory/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch the order history for the user
    const orderHistory = await OrderHistory.find({ user: userId }).populate({
      path: "products",
    });

    // if (!orderHistory || orderHistory.length === 0) {
    //   return res.status(404).send("Order history is empty");
    // }

    // Send response after fetching order history
    res.render("orderHistory/index", { orderHistory,user });
  } catch (error) {
    console.error("Error while querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/checkout/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch the cart items for the user
    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).send("Cart is empty");
    }

    // Create a new order history with the current cart items
    const orderHistory = new OrderHistory({
      products: cartItems.map((cartItem) => cartItem.product),
      productQuantity: cartItems.map((cartItem) => cartItem.quantity),
      user: userId,
    });

    // Save the new order history
    await orderHistory.save();

    // Update the user's order history with the new order
    user.orderHistory.push(orderHistory._id);
    await user.save();

    // Delete cart items
    await Cart.deleteMany({ user: userId });

    // Send response after saving order history
    res.render("checkout/index", { items: cartItems });
  } catch (error) {
    console.error("Error while querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/fakeUser", async (req, res) => {
//   const user = new User({ email: "a@gmail.com", username: "a" });
//   const registeredUser = await User.register(user, "monkey");
//   res.send(registeredUser);
// });

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
