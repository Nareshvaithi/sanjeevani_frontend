import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openModuleOfFees: null, // edit // add;
    feesListFields:[
        {id:1,title:'Student ID'},
        {id:2,title:'Name'},
        {id:3,title:'Batch'},
        {id:4,title:'Fees Type'},
        {id:5,title:'Payment Type'},
        {id:6,title:'Payment Date'},
        {id:7,title:'Invoice No'},
        {id:8,title:'Payment Due'},
        {id:9,title:'Status'},
        {id:10,title:'Amount'},
        {id:11,title:'Actions'},
    ],
}

const feesSlice = createSlice({
    name:'fees',
    initialState,
    reducers:{
        setOpenModuleFees:(state,action)=>{
            state.openModuleOfFees = action.payload;
        }
    },
})

export default feesSlice.reducer;
export const { setOpenModuleFees } = feesSlice.actions;
export const selectFeesListField = (state)=>state.fees.feesListFields;
export const selectOpenModuleOfFees = (state)=>state.fees.openModuleOfFees;
