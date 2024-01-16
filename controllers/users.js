const User = require("../models/user");

// Async Function for registering a new user

module.exports.register = async (req, res, next) => {
  try {
    // Destructuring the email, password and confirmPassword from the request body
    const { email, password, confirmPassword } = req.body;
    // Checking if the password and confirmPassword are the same. If they are same then the user is registered and logged in, else redirected to the sign up page
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
