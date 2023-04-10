import { useDispatch } from "react-redux";
import { editValue } from "./Store/Store";
import { printf, scanf } from "./Store/Store2";

const EditOptions = ({ value, changes }) => {
    const dispatch = useDispatch();
    const save = () => {
        changes(value);
    }
    const cancel = () => {
        dispatch(editValue({ editValue: value.id }));
        changes(0);
    }
    return (
        <div>
            <p>{value.todoValue}</p>
            <button onClick={save}>Save</button>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}
export default EditOptions;