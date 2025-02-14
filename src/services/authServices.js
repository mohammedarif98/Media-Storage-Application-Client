import { apiRequest } from "./axiosConfig";


export const registerUser = async(userData) => {
  try{
    const response = await apiRequest({
        url: "/api/auth/user/user-register",
        method: "POST",
        data: userData,
    });
    return response.data;
  } catch(error){
    const message = error.response?.data?.message || 
                   error.message || 
                   "Registration failed. Please try again.";
    throw new Error(message);
  }
};


export const loginUser = async(userData) => {
    try{
        const response = await apiRequest({
            url: "/api/auth/user/user-login",
            method: "POST",
            data: userData,
        });
        return response.data;
    }catch(error){
        const message = error.response?.data?.message || 
                   error.message || 
                   "Login failed. Please try again.";
    throw new Error(message);
    }
}