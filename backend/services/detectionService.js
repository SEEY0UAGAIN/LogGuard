const { Description } = require("@mui/icons-material");
const Alert = require("../models/Alert");
const axios = require("axios");

const runDetection = async (log) => {
  const { ip, endpoint, message, userAgent } = log;

  const alerts = [];

  //ตรวจพบ SQL Injection
  const sqlInjectionPatterns = ["' OR 1=1", "UNION SELECT", "--", "/*"];
  if (sqlInjectionPatterns.some((pattern) => endpoint.includes(pattern))) {
    alerts.push({
      type: "SQL Injection",
      ip,
      endpoint,
      details: `Detected in endpoint: ${endpoint}`,
    });
  }

  //ตรวจพบ Malicious User-Agent
  const badAgents = ["sqlmap", "acunetix", "namp", "nikro"];
  if (badAgents.some((agent) => userAgent.toLowerCase().includes(agent))) {
    alerts.push({
      type: "Malicious User-Agent",
      ip,
      endpoint,
      details: `Suspicious User Agent: ${userAgent}`,
    });
  }

  //ตรวจพบการเข้าถึง Endpoint ที่สำคัญ
  const sensitiveEndpoints = ["/admin", "/config", "/env", "/phpmyadmin"];
  if (sensitiveEndpoints.includes(endpoint.toLowerCase())) {
    alerts.push({
      type: "Sensitive Endpoint Access",
      ip,
      endpoint,
      details: `Accessed: ${endpoint}`,
    });
  }

  //ตรวจพบ Brute Force Detection
  const recentLogs = await log.constructor.find({
    ip,
    endpoint,
    status: 401,
    timestamp: { $gte: new Date(Date.now() - 60 * 1000) }, // 1 นาทีที่ผ่านมา
  });

  if (recentLogs.length >= 5) {
    alerts.push({
      type: "Brute Force Login",
      ip,
      endpoint,
      details: `Failed login ${recentLogs.length} times in last minute.`,
    });
  }

  // บันทึก alerts ลงฐานข้อมูล + ส่งแจ้งเตือน Discord
  for (const alert of alerts) {
    const newAlert = await Alert.create(alert);
    await sendDiscordNotify(alert); // ส่งแจ้งเตือน Discord
  }
};

const sendDiscordNotify = async (alert) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  const message = {
    embeds: [
      {
        title: `⚠️ Alert: ${alert.type} 🚨`,
        description: `**IP:** ${alert.ip}\n**Details:** ${
          alert.details
        }\n**Time:** ${new Date().toLocaleString()}`,
        color: 15158332,
      },
    ],
  };

  try {
    await axios.post(webhookUrl, message, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Discord notify sent");
  } catch (error) {
    console.error("Discord notify failed:", error.message);
  }
};

module.exports = runDetection;
