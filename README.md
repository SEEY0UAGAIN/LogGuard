# 🔐 LogGuard

ระบบตรวจจับความผิดปกติจาก Log แบบเรียลไทม์ สำหรับช่วยวิเคราะห์ความปลอดภัยเบื้องต้น
สามารถใช้ตรวจจับ Brute-force, SQL Injection, Malicious User-Agent และพฤติกรรมที่ผิดปกติอื่น ๆ ได้แบบอัตโนมัติ พร้อมระบบแจ้งเตือนผ่าน **Discord Webhook** และแสดงผลในรูปแบบ Dashboard
--

# ⚙️ Tech Stack

Backend Node.js + Express |
Database MongoDB |
Frontend React + Chart.js |
Notification Discord Webhook

--

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
  - Top 10 IP ที่มี log มากที่สุด
  - Top 10 Endpoints ที่ถูกเรียกบ่อย
- [x] ตาราง Alert แบบ real-time (auto refresh)
- [x] ระบบ Filter/Search (กำลังพัฒนา)
- [ ] Export PDF รายงาน (เร็ว ๆ นี้)

--

# 📦 Project Status

กำลังพัฒนา
