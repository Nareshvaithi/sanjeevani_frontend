import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
  studentsEventsList: [],
  status: "idle",
  editstatus: "Submit",
  deletestatus: "Submit",
  addstatus: "Submit",
  error: null,
  eventList: [],
};

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL", API_URL);

// Fetch all student events 
export const fetchStudentsEvents = createAsyncThunk(
  "events/fetchStudentsEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch events");
    }
  }
);

// Add new event
export const addStudentsEvents = createAsyncThunk(
  "events/addStudentsEvents",
  async (studentsEventsData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/events`, studentsEventsData);
      toast.success("Event added successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to add event");
      return rejectWithValue(error.response?.data || "Error adding event");
    }
  }
);

// Delete event
export const deleteStudentsEvents = createAsyncThunk(
  "events/deleteStudentsEvents",
  async (eventId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/events/${eventId}`);
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
export const editStudentsEvents = createAsyncThunk(
  "events/editStudentsEvents",
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/events/${_id}`, updatedData);
      toast.success("Event edited successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to edit event");
      return rejectWithValue(error.response?.data || "Error editing event");
    }
  }
);

const studentsEventsSlice = createSlice({
  name: "studentsEvents",
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
      .addCase(fetchStudentsEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentsEventsList = action.payload;
      })
      .addCase(fetchStudentsEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch events");
      })

      // Add event
      .addCase(addStudentsEvents.pending, (state) => {
        state.addstatus = "Processing";
      })
      .addCase(addStudentsEvents.fulfilled, (state, action) => {
        state.addstatus = "Submit";
        state.studentsEventsList.push(action.payload);
      })
      .addCase(addStudentsEvents.rejected, (state, action) => {
        state.addstatus = "Submit";
        state.error = action.payload;
      })

      // Delete event
      .addCase(deleteStudentsEvents.pending, (state) => {
        state.deletestatus = "Processing";
      })
      .addCase(deleteStudentsEvents.fulfilled, (state, action) => {
        state.deletestatus = "Submit";
        state.studentsEventsList = state.studentsEventsList.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteStudentsEvents.rejected, (state, action) => {
        state.deletestatus = "Submit";
        state.error = action.payload;
      })

      // Edit event
      .addCase(editStudentsEvents.pending, (state) => {
        state.editstatus = "Processing";
      })
      .addCase(editStudentsEvents.fulfilled, (state, action) => {
        state.editstatus = "Submit";
        state.studentsEventsList = state.studentsEventsList.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(editStudentsEvents.rejected, (state, action) => {
        state.editstatus = "Submit";
        state.error = action.payload;
      });
  },
});

export default studentsEventsSlice.reducer;
export const selectEvents = (state) => state.studentsEvents.eventList;
export const SelectEventList = (state) => state.studentsEvents.studentsEventsList;
export const { addEvent } = studentsEventsSlice.actions;
