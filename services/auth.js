const jwt = require('jsonwebtoken');
const secretKey = "askldfjlkjdfg"; // Replace with your actual secret key

function setUser( user) {
const playload = {
    _id: user._id,
    email: user.email,
    role:user.role
  };
  const token = jwt.sign(playload, secretKey, { expiresIn: '12h' });
  
  
  // Return the token
  return token;
}

function getUser(token) {

try{
    return jwt.verify(token, secretKey);
}
catch(error){
return null;
}
}

module.exports = {
  setUser,
  getUser,
};