import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-sanjeevani.konceptsdandd.com/student/entroll";

const initialValue = {
    singleStudentDetails: {},
    status: "idle",
    error: null,
};


export const fetchSingleStudent = createAsyncThunk(
    "single/fetchSingleStudent",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch student details");
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
                console.log(action.payload);
            })
            .addCase(fetchSingleStudent.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default studentDetailsSingle.reducer;
export const {setSingleStudentRecord} = studentDetailsSingle.actions;
export const selectSingleStudent = (state) => state.singleStudent.singleStudentDetails;
export const selectSingleStudentStatus = (state) => state.singleStudent.status;
