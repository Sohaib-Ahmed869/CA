import axios from "axios";

// Get backend URL from .env file
const BASE_URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const requestDocuments = async (applicationId, documents) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/rto/request-documents/${applicationId}`,
      {
        requestedDocuments: documents,
      }
    );

    return response.data; // Return response for further processing
  } catch (error) {
    console.error("Error requesting documents:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
