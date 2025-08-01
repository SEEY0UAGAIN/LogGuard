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
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">📍 Top Endpoints</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default EndpointChart;
