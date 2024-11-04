import axios from "axios";
//get url from .env file vite project
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${URL}/api/admin/customers`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyCustomer = async (customerId) => {
  try {
    const response = await axios.put(`${URL}/api/admin/verify/${customerId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getApplications = async () => {
  try {
    const response = await axios.get(`${URL}/api/admin/applications`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyApplication = async (applicationId) => {
  try {
    const response = await axios.put(
      `${URL}/api/admin/verifyApplication/${applicationId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const markApplicationAsPaid = async (applicationId) => {
  try {
    const response = await axios.put(
      `${URL}/api/admin/markApplicationAsPaid/${applicationId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const uploadCertificate = async (applicationId, data) => {
  try {
    console.log("Data being sent:", data.get("certificate")); // Check if FormData has the file
    const response = await axios.put(
      `${URL}/api/applications/certificate/${applicationId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    return error.response.data;
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${URL}/api/admin/dashboardStats`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
