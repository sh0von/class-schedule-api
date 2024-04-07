const express = require("express");
const router = express.Router();
const Course = require("../models/course");

router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.instructorId) {
      query.instructor = { $regex: new RegExp(req.query.instructorId, "i") };
    }

    if (req.query.departmentId) {
      query.department = { $regex: new RegExp(req.query.departmentId, "i") };
    }

    if (req.query.batchId) {
      query.batch = { $regex: new RegExp(req.query.batchId, "i") };
    }

    if (req.query.day) {
      query.day = { $regex: new RegExp(req.query.day, "i") };
    }

    if (req.query.time) {
      query.time = { $regex: new RegExp(req.query.time, "i") };
    }

    const courses = await Course.find(query)
      .populate("instructor")
      .populate("department")
      .populate("batch");

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve courses." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, instructor, department, batch, time, day } = req.body;

    const existingCourse = await Course.findOne({ name, department, batch });
    if (existingCourse) {
      return res.status(400).json({ error: "Course already exists." });
    }

    const course = new Course({
      name,
      instructor,
      department,
      batch,
      time,
      day,
    });
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create course." });
  }
});

router.put("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, instructor, department, batch, time, day } = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { name, instructor, department, batch, time, day },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update course." });
  }
});

router.delete("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    res.json({ message: "Course deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete course." });
  }
});

module.exports = router;
