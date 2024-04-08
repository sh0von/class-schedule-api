const mongoose = require("mongoose");

const apiCallSchema = new mongoose.Schema({
  method: String,
  url: String,
  query: Object,
  body: Object,
  timestamp: { type: Date, default: Date.now },
});

apiCallSchema.statics.getCount = async function (query) {
  try {
    const count = await this.countDocuments(query);
    return count;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("ApiCall", apiCallSchema);
