import { apiRequest } from "./axiosConfig";


export const uploadMedia = async(formData) => {
    try{
      const response = await apiRequest({
          url: "/api/user/upload-media",
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" }
      });
      return response;
    } catch(error){
      const message = error.response?.data?.message || error.message || "media uploading failed.";
      throw new Error(message);
    }
};


export const getImageCollection = async() => {
    try{
      const response = await apiRequest({
          url: "/api/user/image-collection",
          method: "GET",
      });
      return response;
    } catch(error){
      const message = error.response?.data?.message || error.message || "Image retrieving failed.";
      throw new Error(message);
    }
};

export const getVideoCollection = async() => {
    try{
      const response = await apiRequest({
          url: "/api/user/vedio-collection",
          method: "GET",
      });
      return response;
    } catch(error){
      const message = error.response?.data?.message || error.message || "Video retrieving failed.";
      throw new Error(message);
    }
};


export const deleteMedia = async(mediaId) => {
  try{
    const response = await apiRequest({
      url: `/api/user/delete-media/${mediaId}`,
      method: "DELETE",
  });
  return response.data;
  }catch(error){
    const message = error.response?.data?.message || error.message || "deleting media failed.";
      throw new Error(message);
  }
}