import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import todoReducer from './Redux-Store/Store';
import App from './App';

const myStore = configureStore({
  reducer: {
    todoList: todoReducer
  }
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={myStore}>
    <App />
  </Provider>
);