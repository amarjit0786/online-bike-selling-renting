import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api/auth",
})

// register

export const registerUser = async (userData)=>{
    const response = await API.post("/register",userData);

    return response.data;
}

// login 

export const loginUser = async (userData)=>{
    const response =await API.post("/login",userData);

    return response.data;
};
