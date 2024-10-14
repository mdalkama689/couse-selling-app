const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ msg: "Please login to continue" });
  }
  const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

  try {
    const decodeToken = jwt.verify(token, JWT_USER_SECRET);
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
      .json({ msg: error.message });
  }
};

module.exports = userAuthMiddleware;
