const { getUser } = require('../services/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
    const sessionId = req.cookies?.token;
    const user = getUser(sessionId);
    
    if (!user || !sessionId) {
        return res.redirect('/login'); // Redirect to login if user is not logged in
    }
    
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
}

async function checkAuth(req, res, next) {
  const sessionId = req.cookies?.token;

  const user = getUser(sessionId);

  req.user = user;
  next();
}


module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
};