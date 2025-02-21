import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "./adminSlice/adminSidebarSlice";
const store = configureStore({
    reducer:{
        adminSideBar:adminSidebarReducer,
    }
})

export default store;