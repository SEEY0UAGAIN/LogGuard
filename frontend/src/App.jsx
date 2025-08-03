import { useState } from "react";
import "./App.css";
import AlertTable from "./components/AlertTable";
import TopIPChart from "./components/TopIPChart";
import EndpointChart from "./components/EndpointChart";

function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 drop-shadow-sm">
        🛡️ LogGuard Realtime Dashboard
      </h1>

      {/* แบ่งสองฝั่งซ้ายขวา */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopIPChart />
        <EndpointChart />
      </div>

      {/* ตารางอยู่ล่างสุด */}
      <div className="mt-8">
        <AlertTable />
      </div>
    </div>
  );
}

export default App;
