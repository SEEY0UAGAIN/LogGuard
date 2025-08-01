import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AlertTable from "./components/AlertTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">📊 LogGuard Dashboard</h1>
        <AlertTable />
      </div>
    </>
  );
}

export default App;
