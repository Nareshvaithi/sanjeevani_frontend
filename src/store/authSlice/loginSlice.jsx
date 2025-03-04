import { createSlice } from "@reduxjs/toolkit";
import loginImage from "../../assets/images/login.png";
const initialState = {
    loginImg: loginImage,
};

const LoginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{},
})

export default LoginSlice.reducer;
export const selectLoginImage = (state)=>state.login.loginImg;

