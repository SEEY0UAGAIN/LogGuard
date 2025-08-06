# 🔐 LogGuard

ระบบตรวจจับความผิดปกติจาก Log แบบเรียลไทม์ สำหรับช่วยวิเคราะห์ความปลอดภัยเบื้องต้น
สามารถใช้ตรวจจับ Brute-force, SQL Injection และพฤติกรรมที่น่าสงสัยอื่น ๆ ได้แบบอัตโนมัติ พร้อมระบบแจ้งเตือนผ่าน **Discord Webhook** และแสดงผลในรูปแบบ Dashboard

## 🚀 Live Demo

🌐 ทดสอบระบบได้ที่: [https://log-guard-nu.vercel.app/](https://log-guard-nu.vercel.app/)

👉 ดู Log ใน Discord ได้ที่ : [https://discord.gg/RYAvqsZHDb](https://discord.gg/RYAvqsZHDb)

# ⚙️ Tech Stack

Backend: Node.js + Express |
Database: MongoDB |
Frontend: React + Chart.js + Tailwind + Chart.js|
Notification: Discord Webhook |
Deploy: Vercel + Render

## 🧩 Features

- [x] รับ Log ผ่าน API `/api/logs`
- [x] ตรวจจับพฤติกรรมผิดปกติแบบ Rule-based:
  - Brute Force
  - SQL Injection
  - Malicious User-Agent
  - Suspicious Endpoint Access
- [x] บันทึก Alert ลงฐานข้อมูล
- [x] แจ้งเตือน Discord Webhook แบบ real-time
- [x] Dashboard แสดงกราฟ:
  - Top 5 IP ที่มี log มากที่สุด
  - Top 5 Endpoints ที่ถูกเรียกบ่อย
- [x] ตาราง Alert แบบ real-time (auto refresh)
- [x] ระบบ Filter/Search
- [x] Export PDF รายงาน
