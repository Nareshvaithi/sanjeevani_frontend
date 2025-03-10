import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  studentsEventsList: [],
  status: "idle",
  editstatus: "Submit",
  deletestatus: "Submit",
  addstatus: "Submit",
  error: null,
};


const API_URL = import.meta.env.VITE_API_URL_LOCAL;
console.log("API_URL",API_URL)

export const fetchStudentsEvents = createAsyncThunk(
  "events/fetchStudentsEvents",
  async () => {
    const response = await axios.get(`${API_URL}/events`);
    console.log("response.data",response.data)
    return response.data;
  }
);


//add today rate...........................
export const addStudentsEvents = createAsyncThunk(
  "events/StudentsEvents",
  async (studentsEventsData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, studentsEventsData);
      console.log("succes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding banner");
    }
  }
);

//delete.....................
export const deleteStudentsEvents = createAsyncThunk(
  "events/deleteStudentsEvents",
  async (StudentsEventsId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${StudentsEventsId}`);
      console.log("Success: Rate deleted", StudentsEventsId);
      return StudentsEventsId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting Rate");
    }
  }
);

//edit.........................
export const editStudentsEvents = createAsyncThunk(
  "events/editStudentsEvents",
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
   
    try {
        const response = await axios.put(`${API_URL}/${_id}`, updatedData);
      console.log("Success:  Edited", _id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error Editing Rate");
    }
  }
);

const studentsEventsSlice = createSlice({
  name: "studentsEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsEvents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentsEvents.fulfilled, (state, action) => {
        state.studentsEventsList = action.payload;
      })

      //for adding rates...................................
      .addCase(addStudentsEvents.pending, (state) => {
        state.addstatus = "Proccessing";
      })
      .addCase(addStudentsEvents.fulfilled, (state, action) => {
        state.addstatus = "Submit";
        state.studentsEventsList = [...state.studentsEventsList, action.payload];  
      })
      .addCase(addStudentsEvents.rejected, (state, action) => {
        state.addstatus = "Submit";
        state.error = action.payload;
        toast.error("Add Failed");
      })

      //for deleting event........................
      .addCase(deleteStudentsEvents.pending, (state) => {
        state.deletestatus = "Proccessing";
      })
      .addCase(deleteStudentsEvents.fulfilled, (state, action) => {
        state.deletestatus = "succeeded";
        state.studentsEventsList = state.studentsEventsList.filter(
          (event) =>event._id !== action.payload
        )
      //   toast.success("Delete Successful!", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      // });
      })
      .addCase(deleteStudentsEvents.rejected, (state, action) => {
        state.deletestatus = "Submit";
        state.error = action.payload;
        toast.error("Delete Failed");
      })


      //for editing rate........................
      .addCase(editStudentsEvents.pending, (state) => {
        state.editstatus = "Proccessing";
      })
      .addCase(editStudentsEvents.fulfilled, (state, action) => {
        state.editstatus = "Submit";
        state.studentsEventsList = state.studentsEventsList.map((rate) =>
            rate._id === action.payload._id ? action.payload : rate
        )
      //   toast.success("Edit Successful!", {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      // });
    })      
      .addCase(editStudentsEvents.rejected, (state, action) => {
        state.editstatus = "submit";
        state.error = action.payload;
        toast.error("Edit Failed");
      });
  },
});

export default studentsEventsSlice.reducer;
export const selectEventList = (state) => state.studentsEvents.studentsEventsList;
// export const addstatus = (state) => state.todayRate.addstatus;
