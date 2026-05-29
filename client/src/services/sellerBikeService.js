import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/bikes"
});


// CREATE BIKE
export const createBike = async (
  bikeData,
  token
) => {

  const response = await API.post(
    "/",
    bikeData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


// GET MY BIKES
export const getMyBikes = async (
  token
) => {

  const response = await API.get(
    "/seller/my-bikes",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


// DELETE BIKE
export const deleteBike = async (
  bikeId,
  token
) => {

  const response = await API.delete(
    `/${bikeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


// UPDATE BIKE
export const updateBike = async (
  bikeId,
  bikeData,
  token
) => {

  const response = await API.put(
    `/${bikeId}`,
    bikeData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};