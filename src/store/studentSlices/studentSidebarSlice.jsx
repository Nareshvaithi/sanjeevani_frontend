import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      title: "Home",
      to: "/student/:userId", 
    },
    {
      id: 2,
      title: "Class",
      to: "/student/:userId/class",
    },
    {
      id: 3,
      title: "Attendance",
      to: "/student/:userId/attendance",
    },
    {
      id: 4,
      title: "Apply Leave",
      to: "/student/:userId/apply_leave",
    },
    {
      id: 5,
      title: "Pay Fees",
      to: "/student/:userId/pay_fees",
    },
  ],
  openStudentSidebar: true,
};

const studentSidebarSlice = createSlice({
  name: "studentSidebar",
  initialState,
  reducers: {
    setStudentSidebar: (state, action) => {
      state.openStudentSidebar = action.payload;
    },
    toggleStudentSidebar: (state) => {
      state.openStudentSidebar = !state.openStudentSidebar;
    },
  },
});

export const { setStudentSidebar, toggleStudentSidebar } = studentSidebarSlice.actions;

export default studentSidebarSlice.reducer;

// Selectors
export const selectStudentSidebarData = (state) => state.studentSidebar.data;
export const selectStudentSidebar = (state) => state.studentSidebar.openStudentSidebar;