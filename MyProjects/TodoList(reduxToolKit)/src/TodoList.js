import { useDispatch, useSelector } from "react-redux";
import { addValue, saveChanges } from "./Store/Store";
import { useState } from "react";
import ListItems from "./ListItems";
import '../src/App.css';

const TodoList =_=> {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const storeValues = useSelector(state => state.todo.list);

    const getInputValue = event => {
        setValue(event.target.value);
    }
    const handleSubmit = event => {
        dispatch(addValue({ todoValue: value }));
        setValue('');
        event.preventDefault();
    }
    const editInputBox = item => {
        setValue(item.todoValue);
    }
    const saveChange = item => {
        if (item) {
            dispatch(saveChanges({ editValue: value, id: item.id }))
            setValue('');
            return;
        }
        setValue('');
    }
    return (
        <div className='App'>
            <h1>Todo-List</h1>
            <form onSubmit={handleSubmit}>
                <input type='text'
                placeholder='type your todo'
                onChange={ getInputValue }
                value={value}/>
            </form>
            {storeValues.length > 0 && <ListItems edit={editInputBox} changes={saveChange}/>}
        </div>
    )
}
export default TodoList;