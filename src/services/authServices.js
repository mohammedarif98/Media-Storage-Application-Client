import { apiRequest } from "./axiosConfig";


export const registerUser = async(userData) => {
  try{
    const response = await apiRequest({
        url: "/api/auth/user/user-register",
        method: "POST",
        data: userData,
    });
    return response;
  } catch(error){
    const message = error.response?.data?.message || error.message || "Registration failed. Please try again.";
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
        return response;
    }catch(error){
        const message = error.response?.data?.message || error.message || "Login failed. Please try again.";
      throw new Error(message);
    }
}


export const logoutUser = async() => {
    try{
        const response = await apiRequest({
          url: '/api/auth/user/user-logout',
          method: "POST"
        });
        return response;
    }catch(error){
      const message = error.response?.data?.message ||  error.message || "Logout failed. Please try again.";
      throw new Error(message);
    }
}


export const getUserProfile = async () => {
  try {
      const response = await apiRequest({
          url: '/api/auth/user/user-profile',
          method: "GET",
      });

      const { user, mediaStats } = response.data; 
      return {
          user,
          totalMedia: mediaStats?.totalMedia || 0,
          totalImages: mediaStats?.totalImages || 0,
          totalVideos: mediaStats?.totalVideos || 0,
      };
  } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch user data.";
      throw new Error(message);
  }
};



export const getDashboard = async() => {
    try{
      const response = await apiRequest({
        url: '/api/auth/user/user-dashboard',
        method: "GET",
      });
      return response;
    }catch(error){
      const message = error.response?.data?.message || error.message || "get dashboard failed. Please try again.";
        throw new Error(message);
    }
}