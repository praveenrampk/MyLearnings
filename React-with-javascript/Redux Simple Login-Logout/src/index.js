import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'; //store creating method
import { Provider } from 'react-redux';
import userReducer from './features/user';
 
const store = configureStore({
  reducer: {
    user: userReducer
  }
})
//store: is a storing spaces for hole application in this project
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);