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
import addEventsReducer from "./adminSlices/addEventsSlice";
import studentsNoticeReducer from "./adminSlices/NoticeSlice"
import editStudentReducer from "./studentSlices/editStudentSlice";
import feesReducer from "./adminSlices/feesSlice";
const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
        students:studentsReducer,
        studentSidebar:studentSidebarReducer,
        studentsEnrollment:studentEnrollmentReducer,
        fees:feesReducer,
        studentRecord:studentRecordReducer,
        addEvents:addEventsReducer,
        login:loginReducer,
        adminAuth:AdminAuthReducer,
        studentLogin:studentLoginReducer,
        singleStudent:singleStudentRecordReducer,
        newStudent:newStudentReducer,
        studentsEvents:studentsEventsReducer,
        studentsNotice:studentsNoticeReducer,
        editStudent:editStudentReducer,
    }
})

export default store;
