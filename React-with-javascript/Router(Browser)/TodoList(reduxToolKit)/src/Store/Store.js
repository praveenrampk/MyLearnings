import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'todo',
    initialState: {
        list: [],
    },
    
    reducers: {
        addValue: (state, action) => {
            const obj = {
                id: Math.random(),
                todoValue: action.payload.todoValue,
                completed: false,
                edit: false
            }
            state.list.push(obj);
        },
        completed: (state, action) => {
            state.list.map((data) => {
                if (action.payload.doneValue === data.id) {
                    data.completed = !data.completed;
                    return data;
                }
                return data;
            })
        },
        deleteValue: (state, action) => {
            state.list = state.list.filter((data) => {
                if (data.id === action.payload.deleteValue) {
                    return false;
                }
                return true;
            })
        },
        editValue: (state, action) => {
            state.list.map((data) => {
                if (action.payload.editValue === data.id) {
                    data.edit = !data.edit;
                    return data;
                }
                return data;
            })
        },
        saveChanges: (state, action) => {
            state.list.map((data) => {
                if (action.payload.id === data.id) {
                    data.edit = !data.edit;
                    data.todoValue = action.payload.editValue;
                    return data;
                }
                return data;
            })
        }
    }
})
export const { addValue, completed, deleteValue, editValue, saveChanges } = userSlice.actions;
export default userSlice.reducer;