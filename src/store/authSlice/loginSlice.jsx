import { createSlice } from "@reduxjs/toolkit";
import loginImage from "../../assets/images/login.png";
const initialState = {
    loginImg: loginImage,
    login:null,
};

const LoginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setLogin(state,action){
            state.login = true;
        },
        setLogout(state,action){
            state.login = false;
        }
    },
})

export default LoginSlice.reducer;
export const selectLoginImage = (state)=>state.login.loginImg;
export const selectLoginStatus = (state)=>state.login.login;
export const {setLogin,setLogout} = LoginSlice.actions;

