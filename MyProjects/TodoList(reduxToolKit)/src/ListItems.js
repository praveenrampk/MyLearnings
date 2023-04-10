import { useDispatch, useSelector } from "react-redux";
import { completed, deleteValue, editValue } from "./Store/Store";
import EditOptions from "./Editing";
import '../src/App.css';

const ListItems = ({ edit, changes }) => {
    const storeValues = useSelector(state => state.todo.list);
    const dispatch = useDispatch();

    const handleDoneClick = id => {
        dispatch(completed({ doneValue: id }));
    }
    const handleDeleteClick = id => {
        dispatch(deleteValue({ deleteValue: id }));
    }
    const handleEditClick = value => {
        dispatch(editValue({ editValue: value.id }));
        edit(value);
    }
    return (
        <div>
            {
                storeValues.map((value) => (
                    <div key={value.id} className = {value.completed === true? 'completed' : ''}>
                        { !value.edit === true? 
                            <div>
                                <p>{value.todoValue}</p>
                                <button onClick={() => handleDoneClick(value.id)}>Done</button>
                                <button onClick={() => handleEditClick(value)}>Edit</button>
                                <button onClick={() => handleDeleteClick(value.id)}>Delete</button>
                            </div> 
                            :
                            <EditOptions value={value} changes={changes}/>
                        }
                    </div>
                ))
            }
        </div>
    )
}
export default ListItems;