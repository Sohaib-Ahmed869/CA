const URL = import.meta.env.VITE_REACT_BACKEND_URL;
import axios from "axios";
export const getApplications = async () => {
  try {
    const response = await axios.get(`${URL}/api/assessor/applications`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
