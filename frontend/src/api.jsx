import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/logs",
});

export const getLogs = () => API.get("/logs");
export const getAlerts = () => API.get("/alerts");
export const getTopIPs = () => API.get("/top-ips");
export const getTopEndpoints = () => API.get("/top-endpoints");
