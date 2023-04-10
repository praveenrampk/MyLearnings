import React, { FC, useState } from 'react';
import './App.css';

const App: FC =_=> {
  const [count, setCount] = useState<number>(0);

  const incre = () => {
    setCount(count + 1);
  }
  const decre = () => {
    setCount(count - 1);
  }
  const reset = () => {
    setCount(0);
  }
  return (
    <div className='App'>
      <p>Count: {count}</p>
      <button onClick={incre}>+</button>
      <button onClick={decre}>-</button>
      <button onClick={reset}>|0|</button>
    </div>
  );
}

export default App;