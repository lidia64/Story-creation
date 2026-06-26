import axios from "axios";

const API_URL = "https://sms-express-app-1-production.up.railway.app/api/stories";

export const createStory = async (storyData) => {
    const response = await axios.post(API_URL, storyData);
    return response.data;
}
export const getStories = async () => {
  
    const response = await axios.get(API_URL);  
    return response.data;
    
    };
export const getStoryById = async (storyId) => {
    const response = await axios.get(`${API_URL}/${storyId}`);
    return response.data;
};
export const updateStory = async (storyId, updateStory) => {
    const response = await axios.put(`${API_URL}/${storyId}`, updateStory);
    return response.data;
};
 export const deleteStory = async (storyId) => {
    const response = await axios.delete(`${API_URL}/${storyId}`);
    return response.data;
}   
