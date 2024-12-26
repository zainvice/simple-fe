import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/patient/authSlice'; 

const loadAuthDataFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
  
      if (user && accessToken && refreshToken) {
        return { user, accessToken, refreshToken };
      }
    } catch (error) {
      console.error('Failed to load auth data from localStorage', error);
    }
    return null;
};

const authDataFromLocalStorage = loadAuthDataFromLocalStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
  preloadedState: {
    auth: authDataFromLocalStorage ? authDataFromLocalStorage : undefined,
  },
  
});



