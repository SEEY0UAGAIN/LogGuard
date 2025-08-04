import { useEffect, useState } from "react";
import { getAlerts } from "../api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AlertTable = () => {
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({ ip: "", type: "", endpoint: "" });

  const fetchAlerts = async () => {
    const res = await getAlerts(filters);
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, [filters]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("LogGuard Alert Report", 14, 22);

    const tableColumn = ["Type", "IP", "Details", "Timestamp"];
    const tableRows = [];

    alerts.forEach((alert) => {
      tableRows.push([
        alert.type,
        alert.ip,
        alert.details,
        new Date(alert.timestamp).toLocaleString(),
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [220, 53, 69] },
    });

    doc.save("logguard-alert-report.pdf");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-100 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold mb-4 text-red-700">
        🚨 Recent Alerts
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by IP"
            className="border p-2 rounded"
            value={filters.ip}
            onChange={(e) => setFilters({ ...filters, ip: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by Type"
            className="border p-2 rounded"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Filter by Endpoint"
            className="border p-2 rounded"
            value={filters.endpoint}
            onChange={(e) =>
              setFilters({ ...filters, endpoint: e.target.value })
            }
          />
        </div>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 ml-4 mt-4 md:mt-0 whitespace-nowrap"
          onClick={handleExportPDF}
        >
          📄 Export PDF
        </button>
      </div>

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
        {alerts.length === 0 && (
          <div className="text-center text-gray-500 py-4">No alerts found</div>
        )}
      </div>
    </div>
  );
};

export default AlertTable;
