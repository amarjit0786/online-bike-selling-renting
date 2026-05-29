import axios from "axios";

export const uploadImage =
async (file) => {

  const formData =
  new FormData();

  formData.append(
    "image",
    file
  );

  const response =
  await axios.post(
    "http://localhost:5000/api/upload",
    formData
  );

  return response.data;
};