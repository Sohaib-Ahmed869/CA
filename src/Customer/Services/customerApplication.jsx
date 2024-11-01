import axios from "axios";
//get url from .env file vite project
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const getApplications = async (userId) => {
  try {
    const response = await axios.get(`${URL}/api/applications/user/${userId}`);
    return response.data.applications;
  } catch (error) {
    return error.response.data;
  }
};

export const studentIntakeForm = async (data, applicationId) => {
  try {
    const response = await axios.put(
      `${URL}/api/users/StudentIntakeFormByApplicationId/${applicationId}`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const documentsUpload = async (data, applicationId) => {
  try {
    const response = await axios.put(
      `${URL}/api/users/documentUpload/${applicationId}`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

