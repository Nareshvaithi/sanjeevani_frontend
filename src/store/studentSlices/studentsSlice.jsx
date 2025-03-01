import { createSlice } from "@reduxjs/toolkit";
import samplePic from "../../assets/images/admin/students/sample-pic.jpg";

const initialState = {
    studentsList: [
        {
            id: 1,
            name: "Rajesh",
            profile_pic: samplePic,
            email: "example@gmail.com",
            gender: "Male",
            age: "21",
            payment: "Paid",
            status: "Active",
            contact_no: "1234567890",
            department: "Dance",
            DOB: "14/02/2004",
            address: "123, Mani street 6th cross puducherry puducherry - 605110",
            parent_contact_no: "1234567890",
            join_date: "01/01/2000",
        },
        {
            id: 2,
            name: "Sanavana Pandy",
            profile_pic: samplePic,
            email: "example@gmail.com",
            gender: "Male",
            age: "21",
            payment: "Unpaid",
            status: "Active",
            contact_no: "1234567890",
            department: "Dance",
            DOB: "14/02/2004",
            address: "123, Mani street 6th cross puducherry puducherry - 605110",
            parent_contact_no: "1234567890",
            join_date: "01/01/2000",
        },
        {
            id: 3,
            name: "Arun Kummar",
            profile_pic: samplePic,
            email: "example@gmail.com",
            gender: "Male",
            age: "21",
            payment: "Paid",
            status: "Active",
            contact_no: "1234567890",
            department: "Dance",
            DOB: "14/02/2004",
            address: "123, Mani street 6th cross puducherry puducherry - 605110",
            parent_contact_no: "1234567890",
            join_date: "01/01/2000",
        },
        {
            id: 4,
            name: "Samantha",
            profile_pic: samplePic,
            email: "example@gmail.com",
            gender: "Female",
            age: "18",
            payment: "Paid",
            status: "Active",
            contact_no: "1234567890",
            department: "Dance",
            DOB: "14/02/2004",
            address: "123, Mani street 6th cross puducherry puducherry - 605110",
            parent_contact_no: "1234567890",
            join_date: "01/01/2000",
        },
    ],
    studentDataTitle: [
        { id: 1, title: "ID" },
        { id: 2, title: "Name" },
        { id: 3, title: "Email" },
        { id: 4, title: "Gender" },
        { id: 5, title: "Department" },
        { id: 6, title: "Payment" },
        { id: 7, title: "Status" },
        { id: 8, title: "Actions" },
    ],
    AddStudentFormOpen: null,
    sortField: null,
    sortOrder: "asc", // "asc" or "desc"
};

const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        sortStudents(state, action) {
            const field = action.payload;
            if (state.sortField === field) {
                state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            } else {
                state.sortField = field;
                state.sortOrder = "asc";
            }
        
            state.studentsList.sort((a, b) => {
                let valA = a[field];
                let valB = b[field];
        
            
                if (field === "Payment") {
                    const statusOrder = { "Paid": 1, "Unpaid": 2 };
                    return state.sortOrder === "asc"
                        ? (statusOrder[valA] || 3) - (statusOrder[valB] || 3)
                        : (statusOrder[valB] || 3) - (statusOrder[valA] || 3);
                }
        
                
                if (typeof valA === "string") valA = valA.toLowerCase();
                if (typeof valB === "string") valB = valB.toLowerCase();
        
                if (valA < valB) return state.sortOrder === "asc" ? -1 : 1;
                if (valA > valB) return state.sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        } 
    },
});

export default studentSlice.reducer;
export const { sortStudents } = studentSlice.actions;
export const selectAllStudents = (state) => state.students.studentsList;
export const selectStudentDataTitle = (state) => state.students.studentDataTitle;
export const selectSortField = (state) => state.students.sortField;
export const selectSortOrder = (state) => state.students.sortOrder;
