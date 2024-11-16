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

export const requestMoreDocuments = async (applicationId, message) => {
  try {
    const response = await axios.put(
      `${URL}/api/applications/requestMoreDocuments/${applicationId}`,
      { message }
    );
    return response.data;
  } catch (error) {
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

export const createIndustry = async ({ name, description }) => {
  try {
    const response = await axios.post(`${URL}/api/industry/create`, {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const addCertificateToIndustry = async ({
  industry,
  qualification,
  price,
  type,
}) => {
  try {
    console.log("Industry:", industry);
    console.log("Qualification:", qualification);
    console.log("Price:", price);
    console.log("Type:", type);
    const response = await axios.post(`${URL}/api/industry/certification/`, {
      qualification,
      price,
      type,
      industryId: industry,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getIndustries = async () => {
  try {
    const response = await axios.get(`${URL}/api/industry`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addNoteToApplication = async (applicationId, note) => {
  try {
    const response = await axios.put(
      `${URL}/api/admin/addNoteToApplication/${applicationId}`,
      { note }
    );
    return response.data;
  } catch (error) {
    return "error";
  }
};