import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../../BASE_URL';


export const signup = createAsyncThunk(
  'auth/signup',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { email, phone, dob, gender, firstName, lastName, role, avatar, specialty, practiceName, practiceSize, zipCode, reference} = formData

      console.log("FORM DATA", formData)
      const response = await fetch(`${API_BASE_URL}/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, phoneNumber: phone, dateOfBirth: dob, gender, avatar, specialty, practiceName, reference, practiceSize, firstName, lastName, zipCode, role }),
      });

      console.log("Response: ", response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
        
      }

      return await response.json(); 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { email, phone } = formData

      console.log("FORM DATA", formData)
      const response = await fetch(`${API_BASE_URL}/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, method: 'email' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error occured while sending OTP!');
      }

      return await response.json(); // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ formData }, { rejectWithValue }) => {
      try {
        const { email, phone, role } = formData
        console.log("Email", email)
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, method: 'email', role }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Email login failed');
        }
  
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
// Login AsyncThunk (Email)
export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async ({ formData }, { rejectWithValue }) => {
      try {
        const { email, phone, otp } = formData
        console.log("Email", email, "OTP", otp)
        const response = await fetch(`${API_BASE_URL}/login/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, otp: otp }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Email login failed');
        }
  
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// Login AsyncThunk (Phone)
export const loginWithPhone = createAsyncThunk(
  'auth/loginWithPhone',
  async ({ phone }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Phone login failed');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        
  
        return true; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      accessToken: localStorage.getItem('accessToken') || null, // Initialize with token from localStorage if available
      refreshToken: localStorage.getItem('refreshToken') || null, // Initialize with refreshToken from localStorage
      loading: false,
      error: null,
    },
    reducers: {
      clearAuthData: (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      },
    },
    extraReducers: (builder) => {
      builder
        // Signup
        .addCase(signup.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signup.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
         
          
        })
        .addCase(signup.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        // Send OTP
        .addCase(sendOTP.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(sendOTP.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload; 
        })
        .addCase(sendOTP.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Verify OTP
        .addCase(verifyOTP.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(verifyOTP.fulfilled, (state, action) => {
          state.loading = false;
           
          console.log("PAYLOAD", action.payload)
          state.user = action.payload.message.user;
          state.accessToken = action.payload.message.tokens.accessToken;
          state.refreshToken = action.payload.message.tokens.refreshToken;
          localStorage.setItem('accessToken', action?.payload.message.tokens.accessToken);
          localStorage.setItem('refreshToken', action?.payload.message.tokens.refreshToken);
          localStorage.setItem('user', JSON.stringify(action.payload.message.user));
        })
        .addCase(verifyOTP.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Login User
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Login with Phone
        .addCase(loginWithPhone.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginWithPhone.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
         
        })
        .addCase(loginWithPhone.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Logout
        .addCase(logout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        })
        .addCase(logout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});
  
export const { clearAuthData } = authSlice.actions;
  

export default authSlice.reducer;
