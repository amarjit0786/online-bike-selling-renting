import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api",
})

// get all bikes

export const getAllBikes = async ()=>{
    const response = await API.get("/bikes");

    return response.data;
}


// GET SINGLE BIKE
export const getSingleBike = async (id) => {
  const response = await API.get(`/bikes/${id}`);

  return response.data;
};