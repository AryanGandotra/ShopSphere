const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.redirect("/signUp");
    }
    const user = new User({ email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/products");
    });
  } catch (e) {
    res.redirect("/signUp");
  }
};
