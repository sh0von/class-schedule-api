const express = require("express");
const router = express.Router();
const ApiKey = require("../models/apiKey");

// POST request to create a new API key with a random 16-character string
router.post("/", async (req, res) => {
  try {
    const key = [...Array(16)]
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join("");
    const apiKey = new ApiKey({ key });
    await apiKey.save();
    res.status(201).json(apiKey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create API key." });
  }
});

// GET request to retrieve all API keys
router.get("/", async (req, res) => {
  try {
    const apiKeys = await ApiKey.find();
    res.json(apiKeys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve API keys." });
  }
});

module.exports = router;
