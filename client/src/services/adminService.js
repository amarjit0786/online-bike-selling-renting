import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

export const getAllUsers = async (token) => {
  const response = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteUser = async (id, token) => {
  const response = await API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
// GET ALL BIKES

export const getAllBikes = async (token) => {
  const response = await API.get("/bikes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// DELETE BIKE

export const deleteBike = async (id, token) => {
  const response = await API.delete(`/bikes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
