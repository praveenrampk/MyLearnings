import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo, saveChanges, Todo, TodoState, toggleTodo } from './Redux-Store/Store';
import '../src/App.css';

interface myTodo {
    todoList: TodoState
}
const TodoList: FC = () => {
    const [input, setInput] = useState<string>('');
    const [edit, setEdit] = useState<string>('');
    const [dodo, setDodo] = useState<Todo>();
    // const [store, setStore] = useState<Todo[]>([]);
    
    const getStoreValues = useSelector((state: myTodo) => state.todoList.todos);
    const dispatch = useDispatch();
    const handleAddValue = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>): void => {
        if (input.length > 3) {
            dispatch(addTodo(input));
            setInput('');
        }
        event.preventDefault();
    }
    const handleToggle = (id: number): void => {
        dispatch(toggleTodo(id));
    }
    const handleEdit = (todo: Todo): void => {
        dispatch(editTodo(todo.id));
        setEdit(todo.text);
    }
    const handleDeleteTodo = (id: number): void => {
        dispatch(deleteTodo(id));
    }
    const saveEditedByEnterOrButton = ({event, todo}: {event: React.FormEvent<HTMLFormElement | HTMLButtonElement>, todo: Todo}): void => {
        setEdit(todo.text);
        dispatch(saveChanges({ id: todo.id, value: edit}));
        event.preventDefault();
    }
    const cancelOption = (id: number): void => {
        dispatch(editTodo(id));
    }
    return (
        <div className='App-header'>
            <form onSubmit={(event) => handleAddValue(event)}>
                <input type='text' placeholder='type your todo' onChange={(event) => setInput(event.target.value)} value={input} />
                <button onClick={(event) => handleAddValue(event)}>add</button>
            </form>
            <ul>
                {
                    getStoreValues.map((todo: Todo) =>
                        <li key={todo.id}>
                            {!todo.edit ?
                                <div>
                                    <input type='checkbox' checked={todo.completed} onChange={() => handleToggle(todo.id)} />
                                    <span style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.text}</span>{' '}
                                    <button onClick={() => handleEdit(todo)}>edit</button>
                                    <button onClick={() => handleDeleteTodo(todo.id)}>remove</button>
                                </div>
                                :
                                <div>
                                    {/* <EditOptions todo={todo} setFunction={setInput} currentInput={input} /> */}
                                    <form onSubmit={(event) => saveEditedByEnterOrButton({event, todo})}>
                                        <input type='text' placeholder='edit your todo' onChange={(event) => setEdit(event.target.value)} value={edit}/>
                                    </form>
                                    <button onClick={(event) => saveEditedByEnterOrButton({event, todo})}>save</button>
                                    <button onClick={() => cancelOption(todo.id)}>cancel</button>
                                </div>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default TodoList;