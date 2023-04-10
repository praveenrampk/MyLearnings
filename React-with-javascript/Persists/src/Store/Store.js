import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'persist',
    initialState: {
        count: 0
    },

    reducers: {
        Increment: (state) => {
            ++state.count;
        },
        Decrement: (state) => {
            --state.count;
        },
        Reset: (state) => {
            state.count = 0;
        }
    }
});
export const { Increment, Decrement, Reset } = userSlice.actions;
export default userSlice.reducer;