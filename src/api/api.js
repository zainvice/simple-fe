import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchProviders = async () => {
  try {
    const response = await api.get('/providers'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching providers:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};


export const fetchAppointments = async () => {
  try {
    const response = await api.get('/appointments'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};

export const fetchAppointmentsByEmail = async ({email, role}) => {
  try {
    const response = await api.get('/appointments', {email, role}); 
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments by email and role:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};


export const createAppointment = async (appointmentData) => {
  try {
    console.log("SENDING ", appointmentData)
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};

export const updateAppointment = async (appointmentId, updatedData) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};


export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};


export const patchAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await api.patch(`/appointments/${appointmentId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  }
};
