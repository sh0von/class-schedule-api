const express = require("express");
const router = express.Router();
const Course = require("../models/course");

router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.instructorId) {
      query.instructor = req.query.instructorId;
    }

    if (req.query.departmentId) {
      query.department = req.query.departmentId;
    }

    if (req.query.batchId) {
      query.batch = req.query.batchId;
    }

    const courses = await Course.find(query)
      .populate("instructor")
      .populate("department")
      .populate("batch");

    res.json(courses);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to retrieve courses. Please try again later." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, instructor, department, batch } = req.body;

    const existingCourse = await Course.findOne({ name, department, batch });
    if (existingCourse) {
      return res.status(400).json({
        error:
          "A course with the same name already exists in this department and batch.",
      });
    }

    const course = new Course({ name, instructor, department, batch });
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create course. Please try again later." });
  }
});

router.put("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, instructor, department, batch } = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { name, instructor, department, batch },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update course" });
  }
});

router.delete("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

module.exports = router;
