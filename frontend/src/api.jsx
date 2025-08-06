import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getLogs = () => API.get("/logs");
export const getAlerts = (params = {}) => API.get("/alerts", { params });
export const getTopIPs = () => API.get("/top-ips");
export const getTopEndpoints = () => API.get("/top-endpoints");

export const postLog = (payload) => API.post("/", payload);
