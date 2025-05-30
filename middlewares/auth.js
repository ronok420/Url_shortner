const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.redirect("/login"); // No token or invalid format
  }

  const token = authHeader.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split("Bearer ")[1];
    const user = getUser(token);
    req.user = user;
  }
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
