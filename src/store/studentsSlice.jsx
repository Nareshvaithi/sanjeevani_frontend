import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: [
        {id:1,firstName:"Naresh",lastName:"vaithi",gender:"male"},
        {id:2,firstName:"Santhosh",lastName:"Kumar",gender:"male"},
        {id:3,firstName:"Saravana",lastName:"Prabu",gender:"male"},
        {id:4,firstName:"Muthu",lastName:"",gender:"male"},
        {id:6,firstName:"Priya",lastName:"Priya",gender:"female"},
        {id:7,firstName:"Anushka",lastName:"Priya",gender:"female"},
        {id:8,firstName:"Keethi",lastName:"Priya",gender:"female"},
        {id:9,firstName:"Samantha",lastName:"Priya",gender:"female"},
    ]
}

const studentSlice = createSlice({
    name:'students',
    initialState,
    reducers:{}
})

export default studentSlice.reducer;
export const selectAllStudents = (state)=>state.student.studentsList;