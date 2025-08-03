import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getTopEndpoints } from "../api";

const EndpointChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopEndpoints();
      const labels = res.data.map((item) => item._id);
      const data = res.data.map((item) => item.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Top Endpoints",
            data,
            backgroundColor: "rgba(16, 185, 129, 0.5)",
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold mb-4 text-emerald-700">
        📍 Top 5 Endpoints
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default EndpointChart;
