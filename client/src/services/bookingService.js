import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/bookings",
});


// CREATE BOOKING
export const createBooking = async (
  bookingData,
  token
) => {

  const response = await API.post(
    "/",
    bookingData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// GET USER BOOKINGS
export const getMyBookings = async (token) => {

  const response = await API.get(
    "/my-bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};