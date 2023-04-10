import { useReducer, useState } from 'react';
import ListItems from './ListItems';
import '../src/App.css';

const reducerFunction = (state, action) => {
  switch(action.type) {
    case 'addTodo':
      return [...state, {
        id: Math.random(),
        name: action.text,
        edit: false,
        completed: false
      }];
    case 'done':
      return state = state.map((obj) => {
        if (action.item.id === obj.id) {
          obj.completed = !obj.completed;
          return obj;
        }
        return obj;
      })
    case 'delete':
      return state = state.filter((obj) => {
        if (action.item.id === obj.id) 
          return false;
        return true;
      })
    case 'edit':
      return state = state.map((item) => {
        if (item.id === action.obj.id) {
          item.edit = !item.edit;
          return item;
        }
        return item;
      })
    case 'saveChanges':
      return state = state.map((obj) => {
        if (obj.id === action.item.id)
          return action.item;
        return obj;
      })
  }
}

const App =_=> {
  //this is my state which is created by useReducer
  //state: It holds the current state value, 
  //dispatch: It is a function which is used to perform the actions in the reducerFunction
  const [state, dispatch] = useReducer(reducerFunction, []); //here, the 1st param is reducerFunction, 2nd param is our initial state
  const [input, setInput] = useState('');
  
  const getInput = event => {
    setInput(event.target.value);
  }
  const handleClick = event => {
    dispatch({type: 'addTodo', text: input});
    setInput('');
    event.preventDefault();
  }
  const editing = item => {
    setInput(item.name);
    dispatch({type: 'edit', obj: item})
  }
  const saveChanges = (item) => {
    item.name = input;
    dispatch({type: 'saveChanges', item: item});
    setInput('');
  }
  return (
    <div className='App'>
      <form onSubmit={handleClick}>
        <input type='text'
        placeholder='type your todo'
        value={input}
        onChange={getInput}/>
      </form>
      {state.map(name => <ListItems obj={name} changeFunction={dispatch} editing={editing} input={saveChanges} setInput={setInput}/>)}
    </div>
  )
}
export default App;