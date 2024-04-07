const express = require("express");
const router = express.Router();
const ApiCall = require("../models/apiCall");

router.get("/", async (req, res) => {
  try {
    const apiCallsCount = await ApiCall.getCount();
    res.json({ apiCallsCount });
  } catch (err) {
    console.error("Failed to retrieve API call count:", err);
    res.status(500).json({ error: "Failed to retrieve API call count" });
  }
});

module.exports = router;
