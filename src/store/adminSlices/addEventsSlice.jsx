import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventsFields:[
        {id:1, name:"title", lable:"Title", type:"text"},
        {id:2, name:"batch", lable:"Select Batch", type:"select"},
        {id:3, name:"date", lable:"Happening Date", type:"date"},
        {id:4, name:"starttime", lable:"Start Time", type:"time"},
        {id:5, name:"endtime", lable:"End Time", type:"time"},
    ]
};

const addEventSlice = createSlice({
    name:'addEvents',
    initialState,
    reducers:{}
})

export default addEventSlice.reducer;
export const selectEventFields = (state)=>state.addEvents.eventsFields;