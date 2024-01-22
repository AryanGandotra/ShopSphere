// Importing all the required modules and packages

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
const productRoutes = require("./routes/products");
const loginRoutes = require("./routes/login");
const signUpRoutes = require("./routes/signup");
const logoutRoutes = require("./routes/logout");
const cartRoutes = require("./routes/cart");
const favRoutes = require("./routes/fav");
const orderHistoryRoutes = require("./routes/orderHistory");
const checkoutRoutes = require("./routes/checkout");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");


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
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

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

// Route for home page

app.get("/", async (req, res) => {
  const products = await Products.find({});
  res.render("home", { products });
});

// Routes for all pages using the routes folder

app.use("/products", productRoutes);
app.use("/login", loginRoutes);
app.use("/signUp", signUpRoutes);
app.use("/logout", logoutRoutes);
app.use("/cart", cartRoutes);
app.use("/fav", favRoutes);
app.use("/orderHistory", orderHistoryRoutes);
app.use("/checkout", checkoutRoutes);

// Initiating the server

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
