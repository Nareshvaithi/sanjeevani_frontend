 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import axios from "axios";
 import { toast } from 'react-toastify';
 
 const initialState = {}

 
 
 const studentPaymentReceiptSlice = createSlice({
   name: "studentPaymentReceipt",
   initialState,
   reducers: {
      showPaymentReceipt(state, action) {
            console.log("action.payload",action.payload)
            return { ...action.payload };
          },

 }});
 
 export default studentPaymentReceiptSlice.reducer;
 export const {showPaymentReceipt}=studentPaymentReceiptSlice.actions
 export const selectPaymentRecord=(state)=>state.paymentReceipt