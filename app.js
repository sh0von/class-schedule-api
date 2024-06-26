const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const analyticsMiddleware = require("./middleware/analyticsMiddleware");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(analyticsMiddleware);
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


const departmentRoutes = require("./routes/department");
const instructorRoutes = require("./routes/instructor");
const courseRoutes = require("./routes/course");
const batchRoutes = require("./routes/batch");
const miscRoutes = require("./routes/misc");
const logsRoute = require("./routes/logs");
const accountRoutes = require("./routes/apiKey");

app.use("/departments", departmentRoutes);
app.use("/instructors", instructorRoutes);
app.use("/courses", courseRoutes);
app.use("/batches", batchRoutes);
app.use("/misc", miscRoutes);
app.use("/logs", logsRoute);
app.use("/account", accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
