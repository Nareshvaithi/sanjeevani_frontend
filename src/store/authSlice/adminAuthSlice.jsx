import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminRegProcess: "adminDetails", // adminDetails // userCredentials // confirm
    adminDetailsField: [
        { id: 1, label: 'First Name', type: 'text', name: 'first_name' },
        { id: 2, label: 'Last Name', type: 'text', name: 'last_name' },
        { id: 3, label: 'Gender', type: 'select', name: 'gender', options: ['Male', 'Female', 'Other'] },
        { id: 4, label: 'DOB', type: 'date', name: 'dob' },
        { id: 5, label: 'Age', type: 'text', name: 'age' },
        { id: 6, label: 'Email', type: 'email', name: 'email' },
        { id: 7, label: 'Profile Picture', type: 'file', name: 'profile_picture' },
    ],
    adminCredentialsField:[
        {id:1, name:"userName", label: "UserName", type: "text" },
        {id:2, name:"password", label: "Password", type: "password" },
        {id:3, name:"confirm_password", label: "Confirm Password", type: "password" },
    ]
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminRegProcess:(state,action)=>{
            state.adminRegProcess = action.payload;
        }
    },
});

export default adminAuthSlice.reducer;
export const selectAdminRegProcess = (state) => state.adminAuth.adminRegProcess;
export const {setAdminRegProcess} = adminAuthSlice.actions;
export const selectAdminDetailsField = (state) => state.adminAuth.adminDetailsField;
export const selectAdminCredentialsField = (state)=> state.adminAuth.adminCredentialsField;