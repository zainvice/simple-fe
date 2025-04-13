import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};
export const getUserActiveStatus = async (email) => {
  try {
    const response = await api.get(`/users/status/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const updateUserByEmail = async (email, userData) => {
  try {
    const response = await api.put(`/users/email/${email}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user by email:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const deleteUserByEmail = async (email) => {
  try {
    const response = await api.delete(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user by email:", error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};
