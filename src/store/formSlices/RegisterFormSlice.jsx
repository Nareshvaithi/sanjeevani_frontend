import { createSlice } from "@reduxjs/toolkit";

const initialValue = {};
const studentEntrollSlice = createSlice({
  name: "studentRegister",
  initialState: initialValue,
  reducers: {
    addStudentRecord(state, action) {

      return { ...state, ...action.payload }
    },
  }
});
export const {addStudentRecord}=studentEntrollSlice.actions
export default studentEntrollSlice.reducer;
