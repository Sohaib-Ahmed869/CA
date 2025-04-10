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

export const getPendingApplications = async ({
  page = 1,
  limit = 10,
  search = "",
  industry = "All",
  dateFilter = "All",
  sortBy = "date",
  sortOrder = "desc",
}) => {
  try {
    const response = await axios.get(
      `${URL}/api/assessor/pending-applications`,
      {
        params: {
          page,
          limit,
          search,
          industry,
          dateFilter,
          status: "pending",
          sortBy,
          sortOrder,
        },
      }
    );

    return response.data;
  } catch (error) {
    return (
      error.response?.data || { message: "Error fetching pending applications" }
    );
  }
};

/**
 * Fetch assessed applications with filtering, sorting and pagination
 */
export const getAssessedApplications = async ({
  page = 1,
  limit = 10,
  search = "",
  statusFilter = "All",
  sortBy = "date",
  sortOrder = "desc",
}) => {
  try {
    const response = await axios.get(
      `${URL}/api/assessor/assessed-applications`,
      {
        params: {
          page,
          limit,
          search,
          statusFilter,
          sortBy,
          sortOrder,
        },
      }
    );

    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        message: "Error fetching assessed applications",
      }
    );
  }
};
