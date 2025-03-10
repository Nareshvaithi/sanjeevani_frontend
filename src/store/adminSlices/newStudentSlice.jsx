import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://api-sanjeevani.konceptsdandd.com/student/entroll';

const initialState = {
    newStudentsList:[],
    newStudentStatus: 'idle',
    newStudentError:null,
}

export const fetchNewStudent = createAsyncThunk('enroll/fetchNewStudent', async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
});

const newStudentSlice = createSlice({
    name:'newStudent',
    initialState,
    reducers:{
        
    },
    extraReducers(builder){
        builder
        .addCase(fetchNewStudent.fulfilled,(state,action)=>{
            state.newStudentStatus = 'succeeded';
            state.newStudentsList = action.payload;
        })
        .addCase(fetchNewStudent.pending,(state,action)=>{
            state.newStudentStatus = 'loading';
        })
        .addCase(fetchNewStudent.rejected,(state,action)=>{
            state.newStudentStatus = 'failed';
        })
    }
})


export default newStudentSlice.reducer;
export const selectNewStudents = (state)=>state.newStudents.newStudentsList;