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
            const response = await axios.get(`${API_URL}/student/entroll`); 
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

//delete.....................
export const deleteNewStudent = createAsyncThunk(
    "entroll/deleteNewStudent",
    async (studentId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${API_URL}/student/entroll/${studentId}`);
        return studentId;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting ");
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

              //deleteing new student.................................
              .addCase(deleteNewStudent.pending, (state) => {
                state.deletestatus = "Proccessing";
              })
              .addCase(deleteNewStudent.fulfilled, (state, action) => {
                state.deletestatus = "succeeded";
                state.newStudentsList = state.newStudentsList.filter(
                  (student) => student._id !== action.payload
                )
              })
              .addCase(deleteNewStudent.rejected, (state, action) => {
                state.deletestatus = "Submit";
                state.error = action.payload;
                toast.error("Delete Failed");
              })
    },
});

// Selector for accessing new students list
export const selectNewStudents = (state) => state.newStudent.newStudentsList;
export const selectNewStudentStatus = (state) => state.newStudent.newStudentStatus;
export const selectNewStudentError = (state) => state.newStudent.newStudentError;

export default newStudentSlice.reducer;
