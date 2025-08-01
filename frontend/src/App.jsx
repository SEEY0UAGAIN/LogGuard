import { useState } from "react";
import "./App.css";
import AlertTable from "./components/AlertTable";
import TopIPChart from "./components/TopIPChart";
import EndpointChart from "./components/EndpointChart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">📊 LogGuard Dashboard</h1>
        <TopIPChart />
        <EndpointChart />
        <AlertTable />
      </div>
    </>
  );
}

export default App;
