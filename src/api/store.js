import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/patient/authSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});



