import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showEdit: false,
}

const editStudentSlice = createSlice({
    name:'editStudent',
    initialState,
    reducers:{
        setShowEdit:(state,action)=>{
            state.showEdit = action.payload;
        }
    }
})

export default editStudentSlice.reducer;
export const {setShowEdit} = editStudentSlice.actions;
export const selectShowEdit = (state)=>state.editStudent.showEdit;