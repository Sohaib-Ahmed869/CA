import axios from "axios";
//get url from .env file vite project
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const getApplications = async () => {
  try {
    const response = await axios.get(`${URL}/api/rto/applications`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const SendApplicationToRto = async (application, rto) => {
  try {
    const response = await axios.post(`${URL}/api/rto/sendApplicationtoRto`, {
      application,
      rto,
    });

    return response.data; // Ensure response is returned
  } catch (error) {
    console.error("Error sending application:", error);

    // Ensure function always returns an object
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send application",
    };
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
