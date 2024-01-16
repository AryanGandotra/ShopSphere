const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
  .route("/")
  .get((req, res) => {
    res.render("Auth/signUp");
  })
  .post(async (req, res) => {
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

module.exports = router;