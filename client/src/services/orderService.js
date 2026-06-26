import axios from "axios";

const API = axios.create({
    baseURL:  `${import.meta.env.VITE_API_URL}/orders`,
});

export const buyBike = async (bikeId,token)=>{

    const response = await API.post(
        `/${bikeId}`,
        {},
        {
            headers:{
                Authorization:  `Bearer ${token}`,
            }
        }
    );

    return response.data;
}

export const getMyOrders = async (token)=>{
    const response = await API.get(
        "/my-orders",
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
    )

    return response.data;
}