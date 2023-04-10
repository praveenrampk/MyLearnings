import { useDispatch, useSelector } from "react-redux";
import { Increment, Decrement, Reset } from "./Redux/CounterAction";

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  console.log(counter, "counter");
  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(Reset())}>Reset</button>{'   '}
      <button onClick={() => dispatch(Increment())}>Increment</button>{'   '}
      <button onClick={() => dispatch(Decrement())}>Decrement</button>
    </div>
  )
}
export default App;