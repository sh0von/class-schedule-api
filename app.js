const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;
const authMiddleware = require("./authMiddleware");

app.use(cors());
require("dotenv").config();
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

app.use(bodyParser.json());

app.use("/", authMiddleware);
app.use("/departments", departmentRoutes);
app.use("/instructors", instructorRoutes);
app.use("/courses", courseRoutes);
app.use("/batches", batchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
