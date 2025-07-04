import { configureStore } from '@reduxjs/toolkit';
import namenahi from "./Slices/CounterSlice";
import savecred from "./Slices/UserSlices";

export const store = configureStore({
  reducer: {
    counter: namenahi,
    User: savecred,
  },
})