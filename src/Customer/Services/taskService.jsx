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

// Fetch all tasks
export const fetchAllTasks = async () => {
  try {
    const response = await axios.get(`${URL}/api/tasks`);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch All Tasks Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
