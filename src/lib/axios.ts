import axios from "axios";

const api = axios.create({
  // La URL de tu backend de Node.js
  baseURL: "https://rv-backend-production.up.railway.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
