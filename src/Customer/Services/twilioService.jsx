import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const initiateVerificationCall = async (
  applicationId,
  userId,
  adminUserId
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/call/initiate-call/${userId}`,
      {
        applicationId,
        adminUserId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating verification call:", error);
    throw error;
  }
};
