const express = require("express");
const router = express.Router();
const Batch = require("../models/batch");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const existingBatch = await Batch.findOne({ name });
    if (existingBatch) {
      return res
        .status(400)
        .json({ error: "A batch with the same name already exists." });
    }

    const batch = new Batch({ name });
    await batch.save();

    res.status(201).json(batch);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create batch. Please try again later." });
  }
});

router.put("/:batchId", async (req, res) => {
  try {
    const { batchId } = req.params;
    const { name } = req.body;

    const batch = await Batch.findByIdAndUpdate(
      batchId,
      { name },
      { new: true }
    );

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    res.json(batch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update batch" });
  }
});

router.delete("/:batchId", async (req, res) => {
  try {
    const { batchId } = req.params;

    const batch = await Batch.findByIdAndDelete(batchId);

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    res.json({ message: "Batch deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete batch" });
  }
});

module.exports = router;
