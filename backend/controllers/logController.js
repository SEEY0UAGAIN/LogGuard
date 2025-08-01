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

const Alert = require("../models/Alert");

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    console.error("Failed to fetch alerts", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};
