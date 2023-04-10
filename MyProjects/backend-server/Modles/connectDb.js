const mongodb = require('mongodb');
const Client = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const throwDataBase = async _=> {
    const connection = await Client.connect('mongodb://127.0.0.1:27017');
    let database = connection.db('tsProject');
    
    if (!database) 
        console.log('Not Connected Database');
    return database;
}
module.exports = { throwDataBase, ObjectId }

// await taskCollection.updateOne(
//     { user: _id, "tasks.id": userId },
//     { $set: { "tasks.$.completed": 'tasks.$.completed' }});

//   const user = await taskCollection.findOne({ user: _id })
//   return res.status(200).send(user.tasks);
// }