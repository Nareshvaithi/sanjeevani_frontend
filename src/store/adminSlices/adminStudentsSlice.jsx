import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL ="https://api-sanjeevani.konceptsdandd.com/student/entroll"

const initialState = {
    addsStudentsRecord: [],
    status: "idle",
    editstatus:"save changes",
    studentDataTitle: [
        { id: 1, title: "ID" },
        { id: 2, title: "Name" },
        { id: 3, title: "Email" },
        { id: 4, title: "Gender" },
        { id: 5, title: "Batch" },
        { id: 6, title: "Phone No" },
        { id: 7, title: "Payment" },
        { id: 8, title: "Total payment" },
        { id: 9, title: "Status" },
        { id: 10, title: "Actions" },
    ],
    AddStudentFormOpen: null,
    sortField: null,
    sortOrder: "asc", // "asc" or "desc"
};

export const fetchStudentsRecord = createAsyncThunk(
    "records/fetchStudentsRecords",
    async () => {
      const response = await axios.get(API_URL);
      console.log("Fetched Data:", response.data);
      return response.data;
    }
  );

  //edit student records.................................
  export const editStudentData = createAsyncThunk(
    "data/editStudentData",
    async ({ _id, ...updatedData }, { rejectWithValue }) => {
     
      try {
          const response = await axios.put(`${API_URL}/${_id}`, updatedData);
        console.log("Success: student record Edited", _id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error Editing student record");
      }
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
        
            state.addsStudentsRecord.sort((a, b) => {
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
          })
//for editing student record........................
      .addCase(editStudentData.pending, (state) => {
        state.editstatus = "Proccessing";
      })
      .addCase(editStudentData.fulfilled, (state, action) => {
        alert("succes")
        state.editstatus = "save changes";
        state.addsStudentsRecord = state.addsStudentsRecord.map((data) =>
          data._id === action.payload._id ? action.payload : data
        )
        
    })      
      .addCase(editStudentData.rejected, (state, action) => {
        state.editstatus = "submit";
        state.error = action.payload;
        
      });
        }
})

export default studentSlice.reducer;
export const { sortStudents } = studentSlice.actions;
export const selectAllStudents = (state) => state.students.addsStudentsRecord;
export const selectStudentDataTitle = (state) => state.students.studentDataTitle;
export const selectSortField = (state) => state.students.sortField;
export const selectSortOrder = (state) => state.students.sortOrder;
