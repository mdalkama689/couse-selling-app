const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ msg: "Please login to continue" });
  }
  const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

  try {
    const decodeToken = jwt.verify(token, JWT_ADMIN_SECRET);
    if(!decodeToken){
      return res
      .status(400)
      .json({ msg: "Invalid or expired token. Please login again." });
    
    }
    req.userDetails = decodeToken;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Invalid or expired token. Please login again." });
  }
};

module.exports = adminAuthMiddleware;
