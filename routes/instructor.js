const express = require("express");
const router = express.Router();
const Instructor = require("../models/instructor");
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Failed to retrieve instructors. Please try again later.",
      });
  }
});

router.post("/",authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const instructor = new Instructor({ name });
    await instructor.save();
    res.status(201).json(instructor);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create instructor. Please try again later." });
  }
});

router.put("/:instructorId",authMiddleware, async (req, res) => {
  try {
    const { instructorId } = req.params;
    const { name } = req.body;

    const instructor = await Instructor.findByIdAndUpdate(
      instructorId,
      { name },
      { new: true }
    );

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.json(instructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update instructor" });
  }
});

router.delete("/:instructorId",authMiddleware, async (req, res) => {
  try {
    const { instructorId } = req.params;

    const instructor = await Instructor.findByIdAndDelete(instructorId);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.json({ message: "Instructor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete instructor" });
  }
});


module.exports = router;
