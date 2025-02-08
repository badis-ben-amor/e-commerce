const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userProtect = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer"))
    return res.status(401).json({ message: "Unauthorized: Token missing" });

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SERCRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const adminProtect = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { userProtect, adminProtect };
