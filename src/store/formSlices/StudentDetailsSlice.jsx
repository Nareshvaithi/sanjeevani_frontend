import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const API_URL = `${import.meta.env.VITE_API_URL}`;

const initialValue = {
    singleStudentDetails: {},
    status: "idle",
    addstatus:"submit",
    error: null,
};

export const fetchSingleStudent = createAsyncThunk(
    "single/fetchSingleStudent",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/existingstudents/${id}`);
 
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch student details");
        }
    }
);

  // add payment ........
  export const addPayment = createAsyncThunk(
    "single/addPayment",
    async (studentData, { rejectWithValue }) => {
      try {

        const response = await axios.post(`${API_URL}/existingstudents/existStudentPayment`, studentData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error adding banner");
      }
    }
  );

const studentDetailsSingle = createSlice({
    name: "singleStudent",
    initialState: initialValue,
    reducers: {
        setSingleStudentRecord:(state)=>{
            state.singleStudentDetails = null;
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleStudent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSingleStudent.fulfilled, (state, action) => {
               
                state.status = "succeeded";
                state.singleStudentDetails = action.payload;

            })
            .addCase(fetchSingleStudent.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
                      //for adding payment.......
                      .addCase(addPayment.pending, (state) => {
                        state.addstatus = "Proccessing";
                      })
                      .addCase(addPayment.fulfilled, (state, action) => {
                        state.addstatus = "Submit";
                       
                        state.singleStudentDetails=action.payload
                      })
                      .addCase(addPayment.rejected, (state, action) => {
                        state.addstatus = "Submit";
                        state.error = action.payload;
                       
                        toast.error("Add Failed");
                      })
            
    },
});

export default studentDetailsSingle.reducer;
export const {setSingleStudentRecord} = studentDetailsSingle.actions;
export const selectSingleStudent = (state) => state.singleStudent.singleStudentDetails;
export const selectSingleStudentStatus = (state) => state.singleStudent.status;
