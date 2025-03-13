import { createSlice } from "@reduxjs/toolkit";
import logo from "../../assets/images/sanjeevani.png";
import smallLogo from "../../assets/images/logo-small.png";
import { RxDashboard } from "react-icons/rx";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";

const initialState = {
  data: [
    {
      id: 1,
      title: "Dashboard",
      sublinks: [
        { id: 1, title: 'Admin Dashboard', to: '/admin_dashboard', subBread: "Admin" },
        { id: 2, title: 'Teacher Dashboard', to: '/', subBread: "Teacher" },
        { id: 3, title: 'Student Dashboard', to: '/', subBread: "Student" },
      ],
      icon: <RxDashboard />,
      bread: "Home",
    },
    {
      id: 2,
      title: "Students",
      sublinks: [
        {
          id: 1,
          title: "Student List",
          to: "/admin_dashboard/students",
          subBread: "Students List",
        },
      ],
      icon: <FaGraduationCap />,
      bread: "Students",
    },
    {
      id: 3,
      title: "Fees",
      icon: <LuNotepadText />,
      bread: "Fees",
      sublinks: [
        {
          id: 1,
          title: "Fees Collection",
          to: "",
          subBread: "Fees Collection",
        },
      ],
    },
    {
      id: 4,
      title: "Attendance",
      sublinks: [
        {
          id: 1,
          title: "Student Attendance",
          to: "/admin_dashboard/attendance",
          subBread: "Students Attendance",
        },
      ],
      icon: <BsFileEarmarkCheck />,
      bread: "attendance",
    },
    {
      id: 5,
      title: "Events",
      sublinks: [
        {
          id: 1,
          title: "Student Events",
          to: "/admin_dashboard/events",
          subBread: "Students Events",
        },
        {
          id: 2,
          title: "Add Event & Notice",
          to: "/admin_dashboard/add-event&notice",
          subBread: "Students Events",
        },
      ],
      icon: <MdEventAvailable />,
      bread: "Events",
    },
  ],
  logo: logo,
  smallLogo: smallLogo,
  openSidebar: true,
  breadcrumb: ["Home", "Admin"],
  students: [], // Student data array
  sortField: null,
  sortOrder: "asc", // "asc" or "desc"
};

export const adminSideBar = createSlice({
  name: "adminSideBar",
  initialState,
  reducers: {
    setOpenSidebar(state, action) {
      state.openSidebar = action.payload;
    },
    setBreadCrumb(state, action) {
      const { bread, subBread } = action.payload;
      state.breadcrumb = subBread ? [bread, subBread] : [bread];
    },
    setStudents(state, action) {
      state.students = action.payload;
    },
  },
});

export default adminSideBar.reducer;
export const { setOpenSidebar, setBreadCrumb, sortStudents } = adminSideBar.actions;
export const selectLogo = (state) => state.adminSideBar.logo;
export const selectSmallLogo = (state) => state.adminSideBar.smallLogo;
export const selectAdminSidebarData = (state) => state.adminSideBar.data;
export const selectOpenSidebar = (state) => state.adminSideBar.openSidebar;
export const selectBreadCrumb = (state) => state.adminSideBar.breadcrumb;