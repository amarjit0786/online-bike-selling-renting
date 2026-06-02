import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`,
});

export const getPublicStats = async () => {
  const response = await API.get("/public-stats");

  return response.data;
};
