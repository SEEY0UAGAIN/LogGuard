const express = require("express");
const router = express.Router();
const { receiveLog, getAlerts } = require("../controllers/logController");

router.post("/", receiveLog);
router.get("/alerts", getAlerts);
module.exports = router;
