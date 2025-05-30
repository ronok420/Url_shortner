const { getUser } = require("../services/auth");




// function checkForAuthenticaiton(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   req.user = null; // Initialize user to null
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    
//   } return next(); // No token or invalid format, proceed without user

//   const token = authHeader.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.status(401).json({ error: "Unautenticated" });
//   }

//   req.user = user;
//   next();
// }
function checkForAuthenticaiton(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null; // Initialize user to null
 if (!tokenCookie) {
    return next(); // No token, just proceed without setting req.user
  }

  const token = tokenCookie; // Assuming the token is stored in a cookie named 'token'
  const user = getUser(token);


  req.user = user;
  next();
}


function restrictTo(role =[]){
 return (req, res, next) => {
    if (!req.user ){
      return res.redirect("/login"); // Redirect to login if user is not authenticated or does not have the required role
    }
    if(!role.includes(req.user.role)){
      return res.status(403).json({ error: "Forbidden" }); // User does not have the required role
    }
    return next();
  };
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.redirect("/login"); // No token or invalid format
//   }

//   const token = authHeader.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.split("Bearer ")[1];
//     const user = getUser(token);
//     req.user = user;
//   }
//   next();
// }

module.exports = {
  checkForAuthenticaiton,
  restrictTo
};
