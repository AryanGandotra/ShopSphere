// Function for checking if user is logged in or not

module.exports.isLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  } else {
    next();
  }
};

// Function for storing the url the user is requesting

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

// Function for login in the user and redirecting to the url they were requesting if no url is stored redirecting to home page

module.exports.login = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/";
  delete res.locals.returnTo;
  res.redirect(redirectUrl);
};
