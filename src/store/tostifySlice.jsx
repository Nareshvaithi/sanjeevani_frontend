import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        message: "",
        type: "info", 
    },
    reducers: {
        showToast: (state, action) => {
            const { message, type } = action.payload;
            state.message = message;
            state.type = type;

            toast[type](message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        },
    },
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
