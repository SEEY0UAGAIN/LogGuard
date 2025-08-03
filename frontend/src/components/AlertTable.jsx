import { useEffect, useState } from "react";
import { getAlerts } from "../api";

const AlertTable = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await getAlerts();
      setAlerts(res.data);
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // refresh ทุก 10 วินาที
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-100 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold mb-4 text-red-700">
        🚨 Recent Alerts
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-red-100 text-red-800">
              <th className="p-2">Type</th>
              <th className="p-2">IP</th>
              <th className="p-2">Details</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">{a.type}</td>
                <td className="p-2">{a.ip}</td>
                <td className="p-2">{a.details}</td>
                <td className="p-2">
                  {new Date(a.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertTable;
