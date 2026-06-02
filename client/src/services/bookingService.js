import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/bookings`,
});

// CREATE BOOKING
export const createBooking = async (bookingData, token) => {
  const response = await API.post("/", bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// GET USER BOOKINGS
export const getMyBookings = async (token) => {
  const response = await API.get("/my-bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getBikeBookings = async (bikeId) => {
  const response = await API.get(`/bike/${bikeId}`);

  return response.data;
};
