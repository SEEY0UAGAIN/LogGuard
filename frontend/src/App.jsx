import axios from "axios";
import { useState } from "react";
import { postLog } from "./api";
import AlertTable from "./components/AlertTable";
import TopIPChart from "./components/TopIPChart";
import EndpointChart from "./components/EndpointChart";

function App() {
  const [loadingType, setLoadingType] = useState("");

  const [showIntro, setShowIntro] = useState(true);

  const sendLog = async (payload, label) => {
    setLoadingType(label);
    try {
      if (label === "BruteForce") {
        for (let i = 0; i < 5; i++) {
          await postLog({
            ...payload,
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        await postLog({
          ...payload,
          timestamp: new Date().toISOString(),
        });
      }
      alert(`✅ ส่ง Log (${label}) เรียบร้อย`);
    } catch (err) {
      alert("❌ ส่ง Log ล้มเหลว: " + err.message);
    }
    setLoadingType("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 drop-shadow-sm">
        🛡️ LogGuard Realtime Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() =>
            sendLog(
              {
                ip: "123.123.123.123",
                endpoint: "/login",
                status: 401,
                details: "User failed login",
                userAgent: "FakeBrowser",
              },
              "BruteForce"
            )
          }
          disabled={loadingType === "BruteForce"}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 disabled:opacity-50"
        >
          {loadingType === "BruteForce"
            ? "⏳ กำลังยิง Brute Force"
            : "🔁 ยิง Brute Force"}
        </button>

        <button
          onClick={() =>
            sendLog(
              {
                ip: "234.234.234.234",
                endpoint: "/search?q=' OR 1=1 --",
                status: 200,
                userAgent: "Mozilla",
              },
              "SQLInjection"
            )
          }
          disabled={loadingType === "SQLInjection"}
          className="bg-yellow-600 text-white px-4 py-2 rounded shadow hover:bg-yellow-700 disabled:opacity-50"
        >
          {loadingType === "SQLInjection"
            ? "⏳ ยิง SQL Injection..."
            : "🐍 ยิง SQL Injection"}
        </button>

        <button
          onClick={() =>
            sendLog(
              {
                ip: "8.8.8.8",
                endpoint: "/login",
                status: 200,
                userAgent: "sqlmap",
              },
              "BadUserAgent"
            )
          }
          disabled={loadingType === "BadUserAgent"}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {loadingType === "BadUserAgent"
            ? "⏳ ยิง UA แปลก..."
            : "🧠 ยิง Malicious UA"}
        </button>

        <button
          onClick={() =>
            sendLog(
              {
                ip: "10.10.10.10",
                endpoint: "/admin",
                status: 200,
                userAgent: "Mozilla",
              },
              "SensitiveAccess"
            )
          }
          disabled={loadingType === "SensitiveAccess"}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50"
        >
          {loadingType === "SensitiveAccess"
            ? "⏳ ยิง /admin..."
            : "🔐 ยิง Sensitive Endpoint"}
        </button>
      </div>

      <p className="text-center text-gray-600 mb-4">
        คลิกปุ่มด้านบนเพื่อส่ง Log ปลอม ทดสอบระบบตรวจจับแบบ Realtime
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TopIPChart />
        <EndpointChart />
      </div>

      <AlertTable />

      {showIntro && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowIntro(false)}
        >
          <div
            className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowIntro(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">
              🛡️ ยินดีต้อนรับสู่ LogGuard
            </h2>
            <p className="text-gray-700 mb-2 text-center">
              ระบบวิเคราะห์ Log แบบเรียลไทม์ เพื่อค้นหาภัยคุกคาม เช่น Brute
              Force, SQL Injection และอื่นๆ
            </p>
            <ul className="text-gray-600 text-sm mb-4 space-y-1 text-left list-disc pl-5">
              <li>📊 วิเคราะห์ Top IP และ Endpoint</li>
              <li>🔎 Filter / ค้นหา / ส่งออก PDF</li>
              <li>💬 แจ้งเตือนผ่าน Discord Webhook</li>
            </ul>
            <p className="text-sm text-gray-500 italic text-center">
              👇 คลิกนอกกล่องหรือปุ่ม × เพื่อเริ่มใช้งานระบบ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
