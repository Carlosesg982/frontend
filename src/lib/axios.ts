import axios from "axios";

const api = axios.create({
  // La URL de tu backend de Node.js
  baseURL: "http://localhost:4000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
