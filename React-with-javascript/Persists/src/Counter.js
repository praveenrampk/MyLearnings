import { useDispatch, useSelector } from "react-redux"
import { Decrement, Increment, Reset } from "./Store/Store";

const Counter =_=> {

    const dispatch = useDispatch();
    const count = useSelector(state => state.persist.count);
    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => dispatch(Increment())}>Add</button>
            <button onClick={() => dispatch(Decrement())}>Sub</button>
            <button onClick={() => dispatch(Reset())}>Reset</button>
        </div>
    )
}
export default Counter;