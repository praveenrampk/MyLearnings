const express = require('express');
const { 
    submit, 
    findUserFromDatabase, 
    searchSuggesstion, 
    getAllUsersDetails, 
    addTaskToUser, 
    findUsersTask,
    completedOrNot,
    updatePersonTodo,
    deleteTodoValue,
    fetchDateFromTasks,
    updateTodoDate,
    searchPersonsTodo,
} = require('../Controllers/middlewareApiFuncitons');

const rootRouter = express.Router();

rootRouter.post('/submit', submit);
rootRouter.post('/findUser', findUserFromDatabase);
rootRouter.get('/getAllUsers', getAllUsersDetails);
rootRouter.get('/search/:name', searchSuggesstion);
rootRouter.post('/addTask', addTaskToUser);
rootRouter.post('/findTask', findUsersTask);
rootRouter.post('/updateStatus', completedOrNot);
rootRouter.patch('/updateTodo', updatePersonTodo);
rootRouter.put('/deleteTodo', deleteTodoValue);
rootRouter.get('/fetchDate/:ids', fetchDateFromTasks);
rootRouter.patch('/upDate', updateTodoDate);
rootRouter.get('/searchTodo', searchPersonsTodo);
module.exports = rootRouter; 