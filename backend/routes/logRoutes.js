const express = require("express");
const router = express.Router();
const {
  receiveLog,
  getAlerts,
  getTopIPs,
  getTopEndpoints,
} = require("../controllers/logController");

router.post("/", receiveLog);
router.get("/alerts", getAlerts);
router.get("/top-ips", getTopIPs);
router.get("/top-endpoints", getTopEndpoints);

module.exports = router;
