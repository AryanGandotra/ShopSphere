const express = require("express");
const router = express.Router();
const passport = require("passport");
const { storeReturnTo,login } = require("../middleware.js");

router
  .route("/")
  .get((req, res) => {
    res.render("Auth/login");
  })
  .post(
    storeReturnTo,
    passport.authenticate("local", { failureRedirect: "/login" }),
    login
  );

module.exports = router;
