const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ip: String,
  endpoint: String,
  status: Number,
  message: String,
  userAgent: String,
});

module.exports = mongoose.model("Log", logSchema);
