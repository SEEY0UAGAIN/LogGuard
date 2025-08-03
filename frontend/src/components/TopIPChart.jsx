import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getTopIPs } from "../api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopIPChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopIPs();
      const labels = res.data.map((item) => item._id);
      const data = res.data.map((item) => item.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Top IPs",
            data,
            backgroundColor: "rgba(59, 130, 246, 0.5)",
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">📊 Top 5 IPs</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TopIPChart;
