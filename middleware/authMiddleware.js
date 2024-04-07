const ApiKey = require('../models/apiKey');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const apiKey = await ApiKey.findOne({ key: token });
      if (apiKey) {
        next();
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error("Error authenticating API key:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
