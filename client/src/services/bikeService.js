import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/bikes`,
});

// get all bikes

export const getAllBikes = async () => {
  const response = await API.get("/bikes");

  return response.data;
};

// GET SINGLE BIKE
export const getSingleBike = async (id) => {
  const response = await API.get(`/bikes/${id}`);

  return response.data;
};
