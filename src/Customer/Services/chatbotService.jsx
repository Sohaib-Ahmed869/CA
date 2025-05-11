import axios from "axios";

const URL = import.meta.env.VITE_REACT_BACKEND_URL;

/**
 * Send a message to the chatbot API and get a response
 * @param {string} message - The user's message
 * @param {Array} chatHistory - Array of previous messages in the format [{sender: 'user'|'assistant', text: string}]
 * @returns {Promise} Promise that resolves to the chatbot's response
 */
export const sendChatMessage = async (message, chatHistory = []) => {
  try {
    const response = await axios.post(`${URL}/api/chat`, {
      message,
      chatHistory,
    });

    return {
      success: true,
      data: response.data.response,
    };
  } catch (error) {
    console.error("Error sending chat message:", error);
    return {
      success: false,
      error:
        error.response?.data?.error || "Failed to communicate with the chatbot",
    };
  }
};

/**
 * Initialize a new chat conversation
 * @returns {Array} Empty array to start a new chat history
 */
export const initializeChat = () => {
  return [];
};

/**
 * Add a message to the chat history
 * @param {Array} chatHistory - Current chat history
 * @param {string} sender - Either 'user' or 'assistant'
 * @param {string} text - The message text
 * @returns {Array} Updated chat history
 */
export const addMessageToHistory = (chatHistory, sender, text) => {
  return [...chatHistory, { sender, text, timestamp: new Date() }];
};
