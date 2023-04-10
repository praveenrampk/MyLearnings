import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface setUsersRequirements {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    isLoggedIn: boolean;
}
interface usersBank {
    users: setUsersRequirements[];
}
const initialState: usersBank = {
    users: []
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addOneUser: (state, action: PayloadAction<setUsersRequirements>) => {
            state.users.push(action.payload);
        },
        authendicateUser: (state, action: PayloadAction<string>) => {
            const user = state.users.find(user => user.email === action.payload);
            if (user) 
                user.isLoggedIn = !user.isLoggedIn;
        },
    }
})
export const { addOneUser, authendicateUser } = userSlice.actions;
export default userSlice.reducer;