// controllers/logController.js
const Log = require("../models/Log");
const runDetection = require("../services/detectionService");

exports.receiveLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();

    // ตรวจสอบว่า log นี้ผิดปกติไหม
    await runDetection(log);

    res.status(201).json({ message: "Log received and stored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to store log" });
  }
};
