import { useDispatch, useSelector } from "react-redux";
import { Increment, Decrement, Reset } from "./MyStores/CounterStore";

const Counting = () => {
    const count = useSelector(state => state.count.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(Increment())}>Increment</button>
            <button onClick={() => dispatch(Decrement())}>Decrement</button>
            <button onClick={() => dispatch(Reset())}>Reset</button>
        </div>
    )
}
export default Counting;