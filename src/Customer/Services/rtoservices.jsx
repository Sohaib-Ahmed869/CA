import axios from "axios";
//get url from .env file vite project
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const getApplications = async () => {
  try {
    const response = await axios.get(`${URL}/api/rto/applications`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${URL}/api/rto/stats`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
