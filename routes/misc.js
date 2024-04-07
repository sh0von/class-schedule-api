router.get("/data", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor")
      .populate("department");
    const instructors = await Instructor.find();
    const departments = await Department.find();
    const batches = await Batch.find();
    res.json({ courses, instructors, departments, batches });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to retrieve data. Please try again later." });
  }
});

router.delete("/delete-all-data", async (req, res) => {
  try {
   
    await Promise.all([
      Course.deleteMany({}),
      Instructor.deleteMany({}),
      Department.deleteMany({}),
      Batch.deleteMany({}),
    ]);

    res.status(200).json({ message: "All data deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to delete all data. Please try again later." });
  }
});
