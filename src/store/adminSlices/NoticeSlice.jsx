import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
  studentsNoticeList: [],
  status: "idle",
  editstatus: "Submit",
  deletestatus: "Submit",
  addstatus: "Submit",
  error: null,
  eventList: [],
};

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

// Fetch all student Notice 
export const fetchStudentsNotice = createAsyncThunk(
  "notice/fetchStudentsNotice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/notice`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch Notice");
    }
  }
);

// Add new event
export const addStudentsNotice = createAsyncThunk(
  "notice/addStudentsNotice",
  async (studentsNoticeData, { rejectWithValue }) => {
    try {
      alert("work")
      const response = await axios.post(`${API_URL}/notice`, studentsNoticeData);
      toast.success("Event added successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to add event");
      return rejectWithValue(error.response?.data || "Error adding event");
    }
  }
);

// Delete event
export const deleteStudentsNotice = createAsyncThunk(
  "notice/deleteStudentsNotice",
  async (eventId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/notice/${eventId}`);
      toast.success("Event deleted successfully!");
      alert("success")
      return eventId; // Returning eventId to filter from state
    } catch (error) {
      toast.error("Failed to delete event");
      return rejectWithValue(error.response?.data || "Error deleting event");
    }
  }
);

// Edit event
export const editStudentsNotice = createAsyncThunk(
  "notice/editStudentsNotice",
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/notice/${_id}`, updatedData);
      toast.success("Event edited successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to edit event");
      return rejectWithValue(error.response?.data || "Error editing event");
    }
  }
);

const studentsNoticeSlice = createSlice({
  name: "studentsNotice",
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
      .addCase(fetchStudentsNotice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsNotice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentsNoticeList = action.payload;
      })
      .addCase(fetchStudentsNotice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch Notice");
      })

      // Add event
      .addCase(addStudentsNotice.pending, (state) => {
        state.addstatus = "Processing";
      })
      .addCase(addStudentsNotice.fulfilled, (state, action) => {
        state.addstatus = "Submit";
        state.studentsNoticeList.push(action.payload);
      })
      .addCase(addStudentsNotice.rejected, (state, action) => {
        state.addstatus = "Submit";
        state.error = action.payload;
      })

      // Delete event
      .addCase(deleteStudentsNotice.pending, (state) => {
        state.deletestatus = "Processing";
      })
      .addCase(deleteStudentsNotice.fulfilled, (state, action) => {
        state.deletestatus = "Submit";
        state.studentsNoticeList = state.studentsNoticeList.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteStudentsNotice.rejected, (state, action) => {
        state.deletestatus = "Submit";
        state.error = action.payload;
      })

      // Edit event
      .addCase(editStudentsNotice.pending, (state) => {
        state.editstatus = "Processing";
      })
      .addCase(editStudentsNotice.fulfilled, (state, action) => {
        state.editstatus = "Submit";
        state.studentsNoticeList = state.studentsNoticeList.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(editStudentsNotice.rejected, (state, action) => {
        state.editstatus = "Submit";
        state.error = action.payload;
      });
  },
});

export default studentsNoticeSlice.reducer;
export const selectNotice = (state) => state.studentsNotice.eventList;
export const SelectEventList = (state) => state.studentsNotice.studentsNoticeList;
export const { addEvent } = studentsNoticeSlice.actions;


