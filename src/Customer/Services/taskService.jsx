import axios from "axios";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

// Create a new task
export const createTask = async ({ title, agentName }) => {
  try {
    const response = await axios.post(`${URL}/api/tasks`, {
      title,
      agentName,
    });
    return response.data;
  } catch (error) {
    console.error("Create Task Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update task details
export const updateTaskDetails = async ({
  taskId,
  updates,
  agentName,
  role,
}) => {
  try {
    const response = await axios.patch(`${URL}/api/tasks/${taskId}/details`, {
      ...updates,
      agentName,
      role,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Update Task Details Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update task status
export const updateTaskStatus = async ({ taskId, status, agentName, role }) => {
  try {
    const response = await axios.patch(`${URL}/api/tasks/${taskId}/status`, {
      status,
      agentName,
      role,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Update Task Status Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAllTasks = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.range) {
      params.append("range", filters.range);
    }
    if (filters.startDate) {
      params.append("startDate", filters.startDate);
    }
    if (filters.endDate) {
      params.append("endDate", filters.endDate);
    }

    const response = await axios.get(`${URL}/api/tasks?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch All Tasks Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
