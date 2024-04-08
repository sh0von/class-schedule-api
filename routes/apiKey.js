const express = require("express");
const router = express.Router();
const ApiKey = require("../models/apiKey");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/create", async (req, res) => {
  try {
    const { email } = req.body;
    const key = [...Array(16)]
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join("");
    const apiKey = new ApiKey({ key, email });
    await apiKey.save();

    const mailOptions = {
      from: `"Course Schedule Mailer" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "API Key",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Key</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            text-align: center;
          }
          p {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
          }
          .api-key {
            font-size: 20px;
            font-weight: bold;
            color: #007bff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Login Details</h1>
          <p>Your Email is: <span class="api-key">${email}</span></p>
          <p>Your API key is: <span class="api-key">${key}</span></p>
          <p>Please keep this key secure and do not share it with anyone.</p>
        </div>
      </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email with API key" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json(apiKey);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create API key." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, apiKey } = req.body;

    const user = await ApiKey.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.key !== apiKey) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log in" });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await ApiKey.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await ApiKey.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete all users" });
  }
});

module.exports = router;