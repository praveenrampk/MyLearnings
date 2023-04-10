import { createSlice } from "@reduxjs/toolkit";
//it is used for creating the particular state object

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: '',
            age: 0,
            email: ''
        }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = {
                name: '',
                age: 0,
                email: ''
            }
        }
    }
})
export const { login, logout } = userSlice.actions;
// here, I'm Exporting the actions of userSlice
export default userSlice.reducer;