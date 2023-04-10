import React, { FC } from "react";
import TodoList from "./TodoList";
import '../src/App.css';

const App: FC = () => {
  return (
    <div className="App-header">
      <h1>Todo-List</h1>
      <TodoList/>
    </div>
  )
}
export default App;