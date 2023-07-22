// Imports
const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  console.log("Verifying access token");
  // Extract access token from cookies
  const { accessToken } = req.cookies;

  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).json({ message: "User must log in."})
  }
  // Verify access token
  jwt.verify(
    accessToken,
    process.env.ACCESS_SECRET_KEY,
    (error, decoded) => {
      // Handle expired access token 
      if (error?.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "ExpiredAccessToken"});
      } else {
        // Attach decoded token to request
        req.decoded = decoded;
        next();
      }
    });
  
};

// Exports
module.exports = { 
  verifyAccessToken
};