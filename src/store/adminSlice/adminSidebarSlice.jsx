import { createSlice } from "@reduxjs/toolkit";
import logo from "../../assets/images/sanjeevani.png";
import { RxDashboard } from "react-icons/rx";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";


const initialState = {
    data:[
        {
            id:1,
            title:'Dashboard',
            sublinks:[
                {id:1,title:'Admin Dashboard'},
                {id:2,title:'Teacher Dashboard'},
                {id:3,title:'Student Dashboard'},
            ],
            to:'/home',
            icon:<RxDashboard/>,
        },
        {
            id:2,
            title:'Students',
            to:'/students',
            icon:<FaGraduationCap/>,
        },
        {
            id:2,
            title:'Teachers',
            to:'/teachers',
            icon:<FaChalkboardTeacher/>,
        },
        {
            id:3,
            title:'Batch',
            to:'/batch',
            icon:<FaBuilding/>
        },
        {
            id:4,
            title:'Fees',
            to:'/fees',
            icon:<LuNotepadText/>
        }
    ],
    logo:logo,
    openSidebar:true,

}

export const adminSideBar = createSlice({
    name:'adminSideBar',
    initialState,
    reducers:{
        setOpenSidebar(state,action){
            state.openSidebar = action.payload
        }
    },
})

export default adminSideBar.reducer;
export const selectLogo = (state) => state.adminSideBar.logo; 
export const selectAdminSidebarData = (state) => state.adminSideBar.data;
export const selectOpenSidebar = (state) => state.adminSideBar.openSidebar;
export const {setOpenSidebar} = adminSideBar.actions;