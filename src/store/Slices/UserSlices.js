import { createSlice } from "@reduxjs/toolkit";


const initialState={
    userval: "",
    userdetailss: {},
}

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers:{
        saveNamePass:(state,action)=>{
            state.userval = action.payload
            console.log("is there something coming",action)
        },
        saveuserdetail:(state,action)=>{
            state.userdetailss = action.payload
            console.log("the action is comming here!!!",action)
        }


    }
})

export const {saveNamePass,saveuserdetail}  = userSlice.actions;
export default userSlice.reducer;

