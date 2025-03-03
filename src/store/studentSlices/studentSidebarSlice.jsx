import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[
        {
            id:1,
            title:'Home',
            to:'/student/:userId',
            icon:""
        },
        {
            id:2,
            title:'Class',
            to:'/student/:userId/class/',
            icon:""
        },
        {
            id:3,
            title:'Attendance',
            to:'/student/:userId/attendance',
            icon:""
        },
        {
            id:4,
            title:'Apply Leave',
            to:'/student/:userId/apply_leave',
            icon:""
        },
        {
            id:5,
            title:'Pay Fees',
            to:'/student/:userId/pay_fees',
            icon:""
        },
        
    ],
    openStudentSidebar:true, 
}

const studentSidebarSlice = createSlice({
    name:'userStudent',
    initialState,
    reducers:{
        setStudentSidebar:(state,action)=>{
            state.openStudentSidebar = action.payload
        }
    },
})


export default studentSidebarSlice.reducer;
export const selectStudentSidebarData = (state) => state.studentSidebar.data;
export const selectStudentSidebar = (state)=>state.studentSidebar.openStudentSidebar;