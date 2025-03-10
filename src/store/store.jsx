import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "./adminSlices/adminSidebarSlice";
import studentsReducer from "./adminSlices/adminStudentsSlice";
import studentSidebarReducer from "./studentSlices/studentSidebarSlice";
import studentEnrollmentReducer from "./studentSlices/studentsEnrollmentSlice";
import loginReducer from "./authSlice/loginSlice";
import studentLoginReducer from "./authSlice/AuthSlice";
import studentRecordReducer from  "./formSlices/RegisterFormSlice";
import singleStudentRecordReducer from "./formSlices/StudentDetailsSlice";
import newStudentsReducer from "./adminSlices/newStudentSlice";

const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
        students:studentsReducer,
        studentSidebar:studentSidebarReducer,
        studentsEnrollment:studentEnrollmentReducer,
        studentRecord:studentRecordReducer,
        login:loginReducer,
        studentLogin:studentLoginReducer,
        singleStudent:singleStudentRecordReducer,
        newStudents:newStudentsReducer,
    }
})

export default store;