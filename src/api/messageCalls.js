import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 📩 Send a Message
export const sendMessage = async (messageData) => {
  try {
    const response = await api.post("/messages/send", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    handleApiError(error);
  }
};


export const getMessages = async (senderEmail, receiverEmail) => {
  try {
    const response = await api.get(`/messages/${senderEmail}/${receiverEmail}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    handleApiError(error);
  }
};

export const updateMessageStatus = async (messageId, status) => {
  try {
    const response = await api.patch(`/messages/update-status/${messageId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating message status:", error);
    handleApiError(error);
  }
};

// ⚠️ Handle API Errors
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
  } else if (error.request) {
    throw new Error("No response from the server.");
  } else {
    throw new Error("Request setup error: " + error.message);
  }
};
