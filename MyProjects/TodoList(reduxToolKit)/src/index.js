import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userTodo, { userSlice } from './Store/Store';
import userFings, { userSlice1 } from './Store/Store2'
import App from './App';

const store = configureStore({
  reducer: {
    [userSlice.name]: userTodo,
    [userSlice1.name]: userFings
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);