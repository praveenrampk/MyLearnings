import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'count',
    
    initialState: {value: 0},

    reducers: {
        Increment: (state) => {
            state.value += 1;
        },
        Decrement: (state) => {
            state.value -= 1;
        },
        Reset: (state) => {
            state.value = 0;
        }
    }
})
export const { Increment, Decrement, Reset } = userSlice.actions;
export default userSlice.reducer;