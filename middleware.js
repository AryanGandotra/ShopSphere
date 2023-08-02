module.exports.isLogged = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  } else {
    next();
  }
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.login = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/";
  delete res.locals.returnTo;
  res.redirect(redirectUrl);
};
