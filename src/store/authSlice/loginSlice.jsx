import { createSlice } from "@reduxjs/toolkit";
import loginImage from "../../assets/images/login.jpg";

// Get initial login state from sessionStorage
const storedLogin = sessionStorage.getItem("isLoggedIn");

const initialState = {
    loginImg: loginImage,
    login: storedLogin ? JSON.parse(storedLogin) : null,
};

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin(state) {
            state.login = true;
            sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
        },
        setLogout(state) {
            state.login = false;
            sessionStorage.removeItem("isLoggedIn");
            window.location.reload();
        }
    },
});


export default LoginSlice.reducer;
export const selectLoginImage = (state) => state.login.loginImg;
export const selectLoginStatus = (state) => state.login.login;
export const { setLogin, setLogout } = LoginSlice.actions;
