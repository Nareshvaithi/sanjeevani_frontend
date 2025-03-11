import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
    newStudentsList: [],
    newStudentStatus: "idle",
    newStudentError: null,
};

// Async thunk to fetch new students
export const fetchNewStudent = createAsyncThunk(
    "entroll/fetchNewStudent",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/student/entroll`); // Fixed typo
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch new students");
        }
    }
);

// Action to add new student to existing list
export const addExistingStudent = createAsyncThunk(
    "entroll/addExistingStudent",
    async (student, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/student/entroll`, student);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add student");
        }
    }
);

const newStudentSlice = createSlice({
    name: "newStudent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewStudent.pending, (state) => {
                state.newStudentStatus = "loading";
                state.newStudentError = null;
            })
            .addCase(fetchNewStudent.fulfilled, (state, action) => {
                state.newStudentStatus = "succeeded";
                state.newStudentsList = action.payload;
            })
            .addCase(fetchNewStudent.rejected, (state, action) => {
                state.newStudentStatus = "failed";
                state.newStudentError = action.payload || "Something went wrong";
            })

            // add new to existing student
            .addCase(addExistingStudent.pending, (state) => {
                state.addstatus = "Proccessing";
              })
              .addCase(addExistingStudent.fulfilled, (state, action) => {
                state.addstatus = "Submit";
                state.todayAllRates = [...state.todayAllRates, action.payload];
                toast.success("Add Successful!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
              });
              })
              .addCase(addExistingStudent.rejected, (state, action) => {
                state.addstatus = "Submit";
                state.error = action.payload;
                toast.error("Add Failed");
              })
    },
});

// Selector for accessing new students list
export const selectNewStudents = (state) => state.newStudent.newStudentsList;
export const selectNewStudentStatus = (state) => state.newStudent.newStudentStatus;
export const selectNewStudentError = (state) => state.newStudent.newStudentError;

export default newStudentSlice.reducer;
