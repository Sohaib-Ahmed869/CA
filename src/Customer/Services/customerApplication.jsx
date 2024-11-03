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

export const createNewApplication = async (data, userId) => {
  try {
    console.log(data, userId);
    const response = await axios.post(
      `${URL}/api/applications/new/${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const paymentProcessing = async (applicationId, price) => {
  try {
    // Step 1: Initiate payment with backend to get the client secret
    const response = await axios.post(
      `${URL}/api/applications/payment/${applicationId}`,
      { price }
    );
    const clientSecret = response.data.client_secret;

    return clientSecret;
  } catch (error) {
    console.error("Error initiating payment:", error.response.data);
    return null;
  }
};

export const markApplicationAsPaid = async (applicationId) => {
  try {
    const response = await axios.put(
      `${URL}/api/applications/markAsPaid/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error marking application as paid:", error.response.data);
    return error.response.data;
  }
};
