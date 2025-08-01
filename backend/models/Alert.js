const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  type: String,
  ip: String,
  details: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", alertSchema);
