// // Function for checking if user is logged in or not

// module.exports.isLogged = (req, res, next) => {
//   // if (!req.isAuthenticated()) {
//   //   req.session.returnTo = req.originalUrl;
//   //   return res.redirect("/login");
//   // } else {
//   //   next();
//   // }
// };

// // Function for storing the url the user is requesting

// module.exports.storeReturnTo = (req, res, next) => {
//   if (req.session.returnTo) {
//     res.locals.returnTo = req.session.returnTo;
//   }
//   next();
// };

// // Function for login in the user and redirecting to the url they were requesting if no url is stored redirecting to home page

// module.exports.login = (req, res) => {
//   const redirectUrl = res.locals.returnTo || "/";
//   delete res.locals.returnTo;
//   res.redirect(redirectUrl);
// };

const jwt = require("jsonwebtoken");

// Function for checking if user is logged in or not
module.exports.isLogged = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "abcdefghijklmnopqrstuvwxyz", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }

    // Store the decoded payload in the request
    req.user = decoded;
    next();
  });
};

// Function for storing the url the user is requesting
module.exports.storeReturnTo = (req, res, next) => {
  if (req.user && req.user.returnTo) {
    res.locals.returnTo = req.user.returnTo;
  }
  next();
};

// Function for login in the user and redirecting to the url they were requesting if no url is stored redirecting to home page
module.exports.login = (req, res) => {
  const redirectUrl = res.locals.returnTo || "/";
  delete res.locals.returnTo;
  res.redirect(redirectUrl);
}; 