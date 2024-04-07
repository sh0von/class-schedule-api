const dotenv = require("dotenv");
require("dotenv").config();
const authToken = process.env.AUTH_TOKEN;

const authMiddleware = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (token === authToken) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
