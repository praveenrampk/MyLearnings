const express = require('express');
const { submit, findUserFromDatabase, searchSuggesstion, getDetails } = require('../Controllers/middlewareApiFuncitons');

const rootRouter = express.Router();

rootRouter.post('/submit', submit);
rootRouter.post('/findUser', findUserFromDatabase);
rootRouter.get('/getAllUsers', getDetails);
rootRouter.get('/search/:name', searchSuggesstion);

module.exports = rootRouter;