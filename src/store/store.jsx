import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "./adminSlices/adminSidebarSlice";
import studentsReducer from "./adminSlices/adminStudentsSlice";
import studentSidebarReducer from "./studentSlices/studentSidebarSlice";
import studentEntrollReducer from "./formSlices/RegisterFormSlice"

const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
        students:studentsReducer,
        studentSidebar:studentSidebarReducer,
        studentEntrollRecords:studentEntrollReducer
    }
})

export default store;