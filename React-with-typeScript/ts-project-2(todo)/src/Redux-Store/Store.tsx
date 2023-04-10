import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    edit: boolean;
}
export interface TodoState {
    todos: Todo[];
}
const initialState: TodoState = {
    todos: [],
}
const todoSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Math.random(),
                text: action.payload,
                completed: false,
                edit: false,
            }
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.findIndex(todo => todo.id === action.payload);
            let addAtLast = state.todos[todo];
            addAtLast.completed = !addAtLast.completed;
            state.todos.splice(todo, 1);
            if (addAtLast.completed)
                state.todos.push(addAtLast);
            else
                state.todos.unshift(addAtLast);
        },
        editTodo: (state, action: PayloadAction<number>) => {
            const editTodo = state.todos.find(todo => todo.id === action.payload);
            if (editTodo)
                editTodo.edit = !editTodo.edit;
        },
        saveChanges: (state, action: PayloadAction<{id: number, value: string}>) => {
            const saveChange = state.todos.find(todo => todo.id === action.payload.id);
            if (saveChange) {  
                saveChange.text = action.payload.value;
                saveChange.edit = !saveChange.edit;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const deleteItem = state.todos.findIndex(todo => todo.id === action.payload);
            state.todos.splice(deleteItem, 1);
        }
    }
})
export const { addTodo, toggleTodo, editTodo, saveChanges, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;