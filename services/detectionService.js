const Alert = require("../models/Alert");

const runDetection = async (log) => {
  const { ip, endpoint, message, userAgent } = log;

  // ตัวอย่าง: ตรวจพบ SQL Injection
  const sqlInjectionPatterns = ["' OR 1=1", "UNION SELECT", "--", "/*"];

  if (sqlInjectionPatterns.some((pattern) => endpoint.includes(pattern))) {
    await Alert.create({
      type: "SQL Injection",
      ip,
      details: `Detected in endpoint: ${endpoint}`,
    });
  }

  // เดี๋ยวมาทำแบบอื่น XSS, CSRF, Brute Force
};

module.exports = runDetection;
