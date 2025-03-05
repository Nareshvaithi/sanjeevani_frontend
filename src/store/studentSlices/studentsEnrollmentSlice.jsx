import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    enrollProcess : 'detailsForm', //detailsForm // payment // userCredential // confirm
};
const studentsEnrollmentSlice = createSlice({
    name:'studentsEnrollment',
    initialState,
    reducers:{
        setEnrollProcess:(state,action)=>{
            state.enrollProcess = action.payload;
        }
    },
})

export default studentsEnrollmentSlice.reducer;
export const {setEnrollProcess}  = studentsEnrollmentSlice.actions;
export const selectEnrollProcess = (state) => state.studentsEnrollment.enrollProcess;