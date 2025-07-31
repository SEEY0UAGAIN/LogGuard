const express = require("express");
const router = express.Router();
const { receiveLog } = require("../controllers/logController");

router.post("/", receiveLog);

module.exports = router;
