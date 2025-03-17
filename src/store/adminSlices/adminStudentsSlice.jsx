import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { ToastContainer, toast } from 'react-toastify';
const initialState = {
    addsStudentsRecord: [],
    status: "idle",
    addstatus:"Submit",
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
      const response = await axios.get(`${API_URL}/existingstudents`);
      return response.data;
    }
  );
 
  // add student ........
  export const addStudent = createAsyncThunk(
    "existingstudents/addStudent",
    async (studentData, { rejectWithValue }) => {
      try {
     
        const response = await axios.post(`${API_URL}/existingstudents`, studentData);
    
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error adding banner");
      }
    }
  );

  // add manual payment ........
  export const addManualPayment = createAsyncThunk(
    "existingstudents/addManualPayment",
    async (studentData, { rejectWithValue }) => {
      try {
console.log("studentData",studentData)
        const response = await axios.post(`${API_URL}/existingstudents/existStudentManualPayment`, studentData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error adding banner");
      }
    }
  );


  //edit student records.................................
  export const editStudentData = createAsyncThunk(
    "existingstudents/editStudentData",
    async (formData, { rejectWithValue }) => {
     
      try {
        
          const response = await axios.put(`${API_URL}/existingstudents/${formData.get("_id")}`, formData);
  
        return response.data;
      } catch (error) {
        console.error("Error response:", error.response);
        console.error("Error details:", error);
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
                               
          // for adding

          .addCase(addStudent.pending, (state) => {
            state.addstatus = "Proccessing";
          })
          .addCase(addStudent.fulfilled, (state, action) => {
            state.addstatus = "Submit";
            state.addsStudentsRecord= [...state.addsStudentsRecord, action.payload];
            toast.success("Add Successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
          })
          .addCase(addStudent.rejected, (state, action) => {
            state.addstatus = "Submit";
            state.error = action.payload;
            toast.error("Add Failed");
          })
 //for adding payment.......
 .addCase(addManualPayment.pending, (state) => {
  state.addstatus = "Proccessing";
})
.addCase(addManualPayment.fulfilled, (state, action) => {
  state.addstatus = "Submit";
  console.log("action.payload",action.payload)
  // state.addsStudentsRecord=action.payload
})
.addCase(addManualPayment.rejected, (state, action) => {
  state.addstatus = "Submit";
  state.error = action.payload;
  console.log(action.payload,state.error); 
  console.log("State error after rejection:", state.error);
  toast.error("Add Failed");
})


    
//for editing student record........................
      .addCase(editStudentData.pending, (state) => {
        state.editstatus = "Proccessing";
      })
      .addCase(editStudentData.fulfilled, (state, action) => {

        state.editstatus = "save changes";
        state.addsStudentsRecord = state.addsStudentsRecord.map((data) => {
          if (data._id === action.payload._id) {
            return action.payload;  
          }
          return data;  
        });
        
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