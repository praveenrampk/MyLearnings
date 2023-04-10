import { FC } from 'react';
import { editTodo, saveChanges, Todo } from './Redux-Store/Store';
import { useDispatch } from 'react-redux';


interface EditRequirements {
    todo: Todo
    currentInput: string;
    setFunction: (input: string) => void;
}

const EditOptions: FC<EditRequirements> = ({todo, currentInput, setFunction}) => {
    const dispatch = useDispatch();

    const saveEdited = (): void => {
        setFunction(todo.text);
        dispatch(saveChanges({ id: todo.id, value: currentInput }));
        setFunction('');
    }
    const cancelOption = (): void => {
        dispatch(editTodo(todo.id));
    }
    return (
        <div>
            <li key={todo.id}>{todo.text}</li>
            <button onClick={saveEdited}>save</button>
            <button onClick={cancelOption}>cancel</button>
        </div>
    )
}
export default EditOptions;