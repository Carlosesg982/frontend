import axios from "axios";

const api = axios.create({
  // La URL de tu backend de Node.js
  baseURL: process.env.NEXT_PUBLIC_URL_BACKEND ||"https://rv-backend-production.up.railway.app/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
