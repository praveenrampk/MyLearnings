import { createSlice } from "@reduxjs/toolkit";

export const userSlice1 = createSlice({
    name: 'store2',
    initialState: {
        value: 0
    },
    reducers: {
        printf: () => {
            console.log('printf');
        },
        scanf: () => {
            console.log('scanf');
        }
    }
})
export default userSlice1.reducer;
export const { printf, scanf } = userSlice1.actions;