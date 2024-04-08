const express = require("express");
const router = express.Router();
const Department = require("../models/department");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Failed to retrieve departments. Please try again later.",
      });
  }
});

router.post("/",authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res
        .status(400)
        .json({ error: "A department with the same name already exists." });
    }

    const department = new Department({ name });
    await department.save();

    res.status(201).json(department);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create department. Please try again later." });
  }
});

router.put("/:departmentId",authMiddleware, async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { name } = req.body;

    const department = await Department.findByIdAndUpdate(
      departmentId,
      { name },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json(department);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update department" });
  }
});

router.delete("/:departmentId",authMiddleware, async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findByIdAndDelete(departmentId);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete department" });
  }
});


module.exports = router;
