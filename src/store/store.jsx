import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "./adminSlices/adminSidebarSlice";
import studentsReducer from "./adminSlices/adminStudentsSlice";
import studentSidebarReducer from "./studentSlices/studentSidebarSlice";
const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
        students:studentsReducer,
        studentSidebar:studentSidebarReducer,
    }
})

export default store;