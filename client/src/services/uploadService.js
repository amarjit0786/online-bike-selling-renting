import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/upload`,
    formData,
  );

  return response.data;
};
