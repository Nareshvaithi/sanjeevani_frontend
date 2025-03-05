import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "./adminSlices/adminSidebarSlice";
import studentsReducer from "./adminSlices/adminStudentsSlice";
import studentSidebarReducer from "./studentSlices/studentSidebarSlice";
import studentEnrollmentReducer from "./studentSlices/studentsEnrollmentSlice";
import loginReducer from "./authSlice/loginSlice";
import studentLoginReducer from "./authSlice/AuthSlice"
const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
        students:studentsReducer,
        studentSidebar:studentSidebarReducer,
        studentsEnrollment:studentEnrollmentReducer,
        login:loginReducer,
        studentLogin:studentLoginReducer
    }
})

export default store;