const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
});

module.exports = mongoose.model("Course", courseSchema);
