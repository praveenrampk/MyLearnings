const mongodb = require('mongodb');
const Client = mongodb.MongoClient;

const throwDataBase = async _=> {
    const connection = await Client.connect('mongodb://127.0.0.1:27017');
    let database = connection.db('tsProject');
    
    if (!database) 
        console.log('Not Connected Database');
    return database;
}
module.exports = { throwDataBase }