const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
