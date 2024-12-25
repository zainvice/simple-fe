import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../../BASE_URL';


export const signup = createAsyncThunk(
  'auth/signup',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const { email, phone, dob, gender, firstName, lastName, role} = formData

      console.log("FORM DATA", formData)
      const response = await fetch(`${API_BASE_URL}/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: email, phoneNumber: phone, dateOfBirth: dob, gender, firstName, lastName, role }),
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
        body: JSON.stringify({ emailAddress: email, method: 'emailAddress' }),
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

// Login AsyncThunk (Email)
export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: email }),
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

// Logout AsyncThunk
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
          method: 'POST',
          credentials: 'include', // Send cookies if required by your API
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Logout failed');
        }
  
        return true; // You can return additional data if required
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
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
        .addCase(loginWithEmail.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginWithEmail.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(loginWithEmail.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(loginWithPhone.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginWithPhone.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(loginWithPhone.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(logout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
          state.loading = false;
          state.user = null; 
        })
        .addCase(logout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

  

export default authSlice.reducer;
