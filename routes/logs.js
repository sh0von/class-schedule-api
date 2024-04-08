const express = require("express");
const router = express.Router();
const ApiCall = require("../models/logs");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/",authMiddleware, async (req, res) => {
  try {
    const countRequested = req.query.count === "true";

    if (countRequested) {
      const apiCallsCount = await ApiCall.getCount();
      res.json({ apiCallsCount });
    } else {
      const allApiCalls = await ApiCall.find();
      res.json({ allApiCalls });
    }
  } catch (err) {
    console.error("Failed to retrieve API calls:", err);
    res.status(500).json({ error: "Failed to retrieve API calls" });
  }
});

module.exports = router;
