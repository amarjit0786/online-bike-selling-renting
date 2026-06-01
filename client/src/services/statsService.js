import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

export const getPublicStats = async () => {
  const response = await API.get("/public-stats");

  return response.data;
};
