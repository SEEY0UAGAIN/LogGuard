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
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">🚨 Recent Alerts</h2>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">IP</th>
            <th className="p-2 text-left">Details</th>
            <th className="p-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{a.type}</td>
              <td className="p-2">{a.ip}</td>
              <td className="p-2">{a.details}</td>
              <td className="p-2">
                {a.timestamp ? new Date(a.timestamp).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
