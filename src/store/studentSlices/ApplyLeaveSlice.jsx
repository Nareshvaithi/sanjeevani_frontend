import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
  studentsLeaveList: [],
  status: "idle",
  editstatus: "Submit",
  deletestatus: "Submit",
  addstatus: "Submit",
  error: null,
  eventList: [],
};

const API_URL = import.meta.env.VITE_API_URL;


// Fetch all student Leave 
export const fetchStudentsLeave = createAsyncThunk(
  "leave/fetchStudentsLeave",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/existingstudents`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch Leave");
    }
  }
);

// Add new event
export const addStudentsLeave = createAsyncThunk(
  "leave/addStudentsLeave",
  async (studentsLeaveData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/Leave`, studentsLeaveData);
      toast.success("Event added successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to add event");
      return rejectWithValue(error.response?.data || "Error adding event");
    }
  }
);

// Delete event
export const deleteStudentsLeave = createAsyncThunk(
  "leave/deleteStudentsLeave",
  async (eventId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/leave/${eventId}`);
      toast.success("Event deleted successfully!");
      return eventId; // Returning eventId to filter from state
    } catch (error) {
      toast.error("Failed to delete event");
      return rejectWithValue(error.response?.data || "Error deleting event");
    }
  }
);

// Edit event
export const editStudentsLeave = createAsyncThunk(
  "leave/editStudentsLeave",
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/leave/${_id}`, updatedData);
      toast.success("Event edited successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to edit event");
      return rejectWithValue(error.response?.data || "Error editing event");
    }
  }
);

const studentsLeaveSlice = createSlice({
  name: "studentsLeave",
  initialState,
  reducers: {
    addEvent: {
      reducer: (state, action) => {
        console.log("New Event Payload:", action.payload);
        if (!action.payload) {
          console.error("Event data is undefined!");
          return;
        }
        state.eventList.push(action.payload);
        console.log("Updated event list:", state.eventList);
      },
      prepare: (eventData) => {
        if (!eventData || typeof eventData !== "object") {
          console.error("Invalid eventData passed to prepare function:", eventData);
          return { payload: {} }; // Prevent undefined payload errors
        }
        return {
          payload: {
            id: Date.now() + Math.floor(Math.random() * 1000), // Unique ID
            ...eventData,
          },
        };
      },
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsLeave.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentsLeaveList = action.payload;
      })
      .addCase(fetchStudentsLeave.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch Leave");
      })

      // Add event
      .addCase(addStudentsLeave.pending, (state) => {
        state.addstatus = "Processing";
      })
      .addCase(addStudentsLeave.fulfilled, (state, action) => {
        state.addstatus = "Submit";
        state.studentsLeaveList.push(action.payload);
      })
      .addCase(addStudentsLeave.rejected, (state, action) => {
        state.addstatus = "Submit";
        state.error = action.payload;
      })

      // Delete event
      .addCase(deleteStudentsLeave.pending, (state) => {
        state.deletestatus = "Processing";
      })
      .addCase(deleteStudentsLeave.fulfilled, (state, action) => {
        state.deletestatus = "Submit";
        state.studentsLeaveList = state.studentsLeaveList.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteStudentsLeave.rejected, (state, action) => {
        state.deletestatus = "Submit";
        state.error = action.payload;
      })

      // Edit event
      .addCase(editStudentsLeave.pending, (state) => {
        state.editstatus = "Processing";
      })
      .addCase(editStudentsLeave.fulfilled, (state, action) => {
        state.editstatus = "Submit";
        state.studentsLeaveList = state.studentsLeaveList.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(editStudentsLeave.rejected, (state, action) => {
        state.editstatus = "Submit";
        state.error = action.payload;
      });
  },
});

export default studentsLeaveSlice.reducer;
export const selectLeave = (state) => state.studentsLeave.eventList;
export const SelectEventList = (state) => state.studentsLeave.studentsLeaveList;
export const { addEvent } = studentsLeaveSlice.actions;
