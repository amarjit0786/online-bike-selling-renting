import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/seller-requests`,
});

// Create Seller Request
export const createSellerRequest = async (token) => {
  const response = await API.post(
    "/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// Get All Requests
export const getAllRequests = async (token) => {
  const response = await API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Approve Request
export const approveRequest = async (id, token) => {
  const response = await API.patch(
    `/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// Reject Request
export const rejectRequest = async (id, token) => {
  const response = await API.patch(
    `/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
