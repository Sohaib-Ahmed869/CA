import axios from "axios";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const submitRPLIntakeForm = async (applicationId, formData) => {
  try {
    // Validate required data
    if (!applicationId) {
      throw new Error("Application ID is required");
    }

    // Create the payload
    const payload = {
      applicationId,
      formData,
    };

    // Send the request to the backend
    const response = await axios.post(
      `${URL}/api/form/submit-rpl-intake-form`,
      payload
    );

    // Return the response data
    return {
      success: true,
      data: response.data,
      message: "RPL form submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting RPL intake form:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
      message: "Failed to submit RPL form",
    };
  }
};

export const submitEnrollmentForm = async (applicationId, formData) => {
  try {
    // Validate required data
    if (!applicationId) {
      throw new Error("Application ID is required");
    }

    // Create the payload
    const payload = {
      applicationId,
      formData,
    };

    // Send the request to the backend
    const response = await axios.post(
      `${URL}/api/form/submit-enrollment-form`,
      payload
    );

    // Return the response data
    return {
      success: true,
      data: response.data,
      message: "RPL form submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting RPL intake form:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
      message: "Failed to submit RPL form",
    };
  }
};
export const getRplIntakeData = async (applicationId) => {
  try {
    const response = await axios.get(
      `${URL}/api/form/rpl-intake/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching RPL intake data:", error);
    return (
      error.response?.data || {
        error: true,
        message: "Failed to fetch RPL intake data",
      }
    );
  }
};
export const getEnrollmentKitData = async (applicationId) => {
  try {
    const response = await axios.get(
      `${URL}/api/form/rpl-enrollment-kit/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching RPL intake data:", error);
    return (
      error.response?.data || {
        error: true,
        message: "Failed to fetch RPL intake data",
      }
    );
  }
};

export const generateRPLIntakeForm = async (applicationId, formData) => {
  try {
    const response = await axios.post(
      `${URL}/api/form/generate-rpl-intake/${applicationId}`,
      { formData }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating RPL Intake form:", error);
    throw error;
  }
};
export default submitRPLIntakeForm;
