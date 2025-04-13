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
    const response = await api.get('/users/providers'); 
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

let isFetchingAppointments = false; // 🚫 Prevents duplicate fetches

export const fetchAppointments = async () => {
  if (isFetchingAppointments) {
    console.warn("⏱️ Fetch already in progress, skipping duplicate request");
    return;
  }

  isFetchingAppointments = true;
  console.log("⏳ Waiting before sending request...");

  try {
    // Artificial delay – wait 1 second 💤
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await api.get('/appointments');
    console.log("✅ Appointments fetched successfully");
    return response.data;

  } catch (error) {
    console.error('❌ Error fetching appointments:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from the server.');
    } else {
      throw new Error('Request setup error: ' + error.message);
    }
  } finally {
    isFetchingAppointments = false; // 🔓 Reset flag
  }
};

export const uploadFile = async (file, uniqueName) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Add file

    const response = await api.post(`/upload?uniqueName=${uniqueName}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

let isFetchingAppointmentsByEmail = false;

export const fetchAppointmentsByEmail = async (email, role) => {
  if (isFetchingAppointmentsByEmail) {
    console.warn("⏱️ Already fetching appointments by email, skipping duplicate request...");
    return;
  }

  isFetchingAppointmentsByEmail = true;
  console.log("⏳ Waiting a moment before sending request for email:", email, "role:", role);

  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Optional pre-delay
    console.time('fetchAppointmentsByEmail');

    const response = await api.get('/appointments/filter', {
      params: { email, role },
      timeout: 10000 // increase timeout to 10 seconds
    });

    console.timeEnd('fetchAppointmentsByEmail');
    console.log("✅ Appointments fetched!");
    return response.data;

  } catch (error) {
    console.error('❌ Error fetching appointments:', error);
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Try again later 😓');
    } else {
      throw new Error('Unexpected error: ' + error.message);
    }
  } finally {
    isFetchingAppointmentsByEmail = false;
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
