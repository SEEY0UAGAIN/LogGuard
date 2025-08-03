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

exports.getTopIPs = async (req, res) => {
  try {
    const topIPs = await Log.aggregate([
      { $group: { _id: "$ip", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.json(topIPs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch to IP" });
  }
};

exports.getTopEndpoints = async (req, res) => {
  try {
    const topEndpoints = await Log.aggregate([
      { $group: { _id: "$endpoint", count: { $sum: 1 } } },
      { $sort: { const: -1 } },
      { $limit: 10 },
    ]);
    res.json(topEndpoints);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top endpoints" });
  }
};

const Alert = require("../models/Alert");

exports.getAlerts = async (req, res) => {
  try {
    const { ip, type, endpoint } = req.query;

    const query = {};

    if (ip) query.ip = { $regex: ip, $options: "i" };
    if (type) query.type = { $regex: type, $options: "i" };
    if (endpoint) query.endpoint = { $regex: endpoint, $options: "i" };

    const alerts = await Alert.find(query).sort({ timestamp: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    console.error("Failed to fetch alerts", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};
