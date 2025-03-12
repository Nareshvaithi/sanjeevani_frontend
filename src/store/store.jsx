import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "./adminSlices/adminSidebarSlice";
import studentsReducer from "./adminSlices/adminStudentsSlice";
import studentSidebarReducer from "./studentSlices/studentSidebarSlice";
import studentEnrollmentReducer from "./studentSlices/studentsEnrollmentSlice";
import loginReducer from "./authSlice/loginSlice";
import studentLoginReducer from "./authSlice/AuthSlice"
import studentRecordReducer from  "./formSlices/RegisterFormSlice"
import singleStudentRecordReducer from "./formSlices/StudentDetailsSlice"
import newStudentReducer from "./adminSlices/newStudentSlice";
import studentsEventsReducer from "./adminSlices/EventsSlices"
import AdminAuthReducer from "./authSlice/adminAuthSlice";
const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
        students:studentsReducer,
        studentSidebar:studentSidebarReducer,
        studentsEnrollment:studentEnrollmentReducer,
        studentRecord:studentRecordReducer,
        login:loginReducer,
        adminAuth:AdminAuthReducer,
        studentLogin:studentLoginReducer,
        singleStudent:singleStudentRecordReducer,
        newStudent:newStudentReducer,
        studentsEvents:studentsEventsReducer
    }
})

export default store;
