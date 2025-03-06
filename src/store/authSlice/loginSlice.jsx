import { createSlice } from "@reduxjs/toolkit";
import loginImage from "../../assets/images/login.png";

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
            sessionStorage.setItem("isLoggedIn", JSON.stringify(true)); // Store in sessionStorage
        },
        setLogout(state) {
            state.login = false;
            sessionStorage.setItem("isLoggedIn", JSON.stringify(false)); // Update sessionStorage
        }
    },
});

export default LoginSlice.reducer;
export const selectLoginImage = (state) => state.login.loginImg;
export const selectLoginStatus = (state) => state.login.login;
export const { setLogin, setLogout } = LoginSlice.actions;
