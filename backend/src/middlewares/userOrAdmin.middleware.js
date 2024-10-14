const jwt = require("jsonwebtoken");

const userOrAdminAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ msg: "Please login to continue" });
  }

  const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
  const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

  try {
    const decodeTokenForAdmin = jwt.verify(token, JWT_ADMIN_SECRET);

    req.userDetails = decodeTokenForAdmin;

    return next();
  } catch (error) {
    try {
      const decodeTokenForUser = jwt.verify(token, JWT_USER_SECRET);

      if (decodeTokenForUser) {
        req.userDetails = decodeTokenForUser;
        return next();
      }
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
};

module.exports = userOrAdminAuthMiddleware;
