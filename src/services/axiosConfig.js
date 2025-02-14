import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//* ---------------- Axios instance ---------------------
export const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json"
    },
})


//* ------------------ Function to make API request ---------------------
export const apiRequest = async(config) => {
    try{
        const response = await apiClient(config);
        console.log(response);
        return response.data;
    }catch( error ){
        const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
    throw new Error(errorMessage);
    }
};