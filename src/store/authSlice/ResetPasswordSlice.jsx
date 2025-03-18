import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create AsyncThunk for sending OTP...............
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login/sendOTP`, { email: userEmail });
      alert("send email")
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Email send failed");
    }
  }
);

//check otp is valid or not.................

export const validOTP = createAsyncThunk(
  "auth/validOTP",
  async (userOTP, { rejectWithValue }) => {
    try {
      console.log(userOTP)
      const response = await axios.post(`${API_URL}/login/checkOTP`, { otp: userOTP })
      return response.data; 
    } catch (error) {
      alert("error")
      return rejectWithValue(error.response?.data?.message || "Invalid");
    }
  }
);

// Initial state
const initialState = {
  user: null,
  error: null,
  isAuthenticated: false, 
};

// Create slice
const sendOTPSlice = createSlice({
  name: "resetpassword", 
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false; 
        state.user = action.payload.user || null; 
        state.isAuthenticated = true; 
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload; 
        state.isAuthenticated = false; 
      })
      .addCase(validOTP.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(validOTP.fulfilled, (state, action) => {
        state.loading = false; 
        state.user = action.payload.user || null; 
        state.isAuthenticated = true; 
      })
      .addCase(validOTP.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload; 
        state.isAuthenticated = false; 
      });
  },
});

export default sendOTPSlice.reducer;
