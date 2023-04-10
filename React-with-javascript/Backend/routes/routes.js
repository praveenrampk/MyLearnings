const express = require('express');
const rootRouter = express.Router();
const { submit, getDetails } = require('../controllers/middlewareFunctionAPI');

rootRouter.post('/submit', submit);
rootRouter.get('/getData', getDetails);
module.exports = rootRouter;