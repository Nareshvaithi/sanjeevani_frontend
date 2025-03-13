import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData)
      const response = await axios.get({`${API_URL}/existingstudents`}, userData);
      localStorage.setItem("token", response.data.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

export const loginAdmin = createAsyncThunk(
      "auth/loginAdmin",
      async (adminData, { rejectWithValue }) => {
        
        try {
          const response = await axios.post({`${API_URL}/adminLogin`}, adminData);
          console.log("admin")
          localStorage.setItem("token", response.data.token); 
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response?.data?.message || "Login Failed");
        }
      }
    );


const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"), 
  loading: false,
  error: null,
  status:"user"
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.status="user"
        localStorage.setItem("user", JSON.stringify(action.payload.user));
  localStorage.setItem("token", action.payload.token);
        
      })
    .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
})
//admin login
.addCase(loginAdmin.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
       state.status="admin"
      localStorage.setItem("user", JSON.stringify(action.payload.user));
localStorage.setItem("token", action.payload.token);
      
    })

  .addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
})

  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state) => state.auth.isAuthenticated; 
export const selectLoginLoading = (state) => state.auth.loading;
export default authSlice.reducer;
