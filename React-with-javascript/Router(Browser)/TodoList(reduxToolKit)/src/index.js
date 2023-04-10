import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userTodo from './Store/Store';
import userFings from './Store/Store2'
import App from './App';

const store = configureStore({
  reducer: {
    todo: userTodo,
    store2: userFings
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);