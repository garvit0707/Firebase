import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
    initialState,
    name: "counter",
    reducers:{
        increment: (state)=>{
            state.value +=2
        },
        decrement: (state)=>{
            state.value-=2
        },
        incrementByAmount:(state, action)=>{
            console.log("the value i am getting from the frontend is here",action,state)
            console.log("the state.payload is here",action.payload)
            if (Array.isArray(action.payload)) {
                action.payload.map((value)=>{
                    console.log("value is@@@@@@@@@",value)
                    return ("value i am getiing is ", value)
                })
            }
            else{
                console.log("the values are not in the format of the array!!!",action.payload)
            }
        }
    }
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;
