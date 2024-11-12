import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const initiateVerificationCall = async (applicationId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/call/make-call`, { applicationId });
    return response.data;
  } catch (error) {
    console.error("Error initiating verification call:", error);
    throw error;
  }
};