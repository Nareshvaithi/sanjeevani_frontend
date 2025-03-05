
import samplePic from "../../assets/images/admin/students/sample-pic.jpg";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL ="http://localhost:3000/student/entroll"

const initialState = {
  addsStudentsRecord: [],
  addstatus: "Browse Files",
  status: "idle",
  error: null,
    studentDataTitle: [
        { id: 1, title: "ID" },
        { id: 2, title: "Name" },
        { id: 3, title: "Email" },
        { id: 4, title: "Gender" },
        { id: 5, title: "Batch" },
        { id: 6, title: "Payment" },
        { id: 7, title: "Status" },
        { id: 8, title: "Actions" },
    ],
    AddStudentFormOpen: null,
    sortField: null,
    sortOrder: "asc", // "asc" or "desc"
};

export const fetchStudentsRecord = createAsyncThunk(
    "records/fetchStudentsRecord",
    async () => {
      const response = await axios.get(API_URL);
      return response.data;
    }
  );

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
    extraReducers: (builder) => {
        builder
          .addCase(fetchStudentsRecord.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.addsStudentsRecord = action.payload;
          })
          .addCase(fetchStudentsRecord.pending, (state, action) => {
            state.status = "loading";
          });
        }
})

export default studentSlice.reducer;
export const { sortStudents } = studentSlice.actions;
export const selectAllStudents = (state) => state.students.addsStudentsRecord;
export const selectStudentDataTitle = (state) => state.students.studentDataTitle;
export const selectSortField = (state) => state.students.sortField;
export const selectSortOrder = (state) => state.students.sortOrder;
