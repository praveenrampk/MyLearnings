const DBManage = require('../DB-Management/CRUD');
const { throwDataBase, addUserToDB, getDatasFromDB } = require('../DB-Management/CRUD')

const submit = async (req, res) => {
  const database = await throwDataBase();
  const { firstName, lastName, email, password, age } = req.body;
  const collection = database.collection('users');
  const user = {
    firstName,
    lastName, 
    email,
    password,
    age,
  }
  await collection.insertOne(user, (error, result) => {
    if (error) throw error;
    console.log('Inserted successfuly');
  })
  return res.send('you have successfuly signed up');
};

const findUserFromDatabase = async (req, res) => {
  const database = await throwDataBase();
  const collection = database.collection('users');
  const current = await collection.findOne(req.body)
  if (!current) {
    console.log('Email | password not match');
    return res.status(400).send('Email | Password Not matches');
  }
  else {
    if (current.password === req.body.password) {
      console.log(current);
      return res.status(200).send(current);
    }
  }
}

const searchSuggesstion = async (req, res) => {
  const params = String(req.params.name);
  console.log(params);
  const database = await throwDataBase();
  const collection = database.collection('users');
  let current = await collection.find().toArray(); 
  current = current.filter((user) => {
    if ((params).toLowerCase() === (user.firstName.slice(0, params.length)).toLowerCase() || (params).toLowerCase() === (user.lastName.slice(0, params.length)).toLowerCase()) {
      console.log(user.firstName.slice(0, params.length))
      return true;
    }
    return false;
  })
  res.send(current); 
}

const getDetails = async (req, res) => {
  const database = await throwDataBase();
  const collection = database.collection('users');
  const current = await collection.find().toArray();
  if (current) {
    console.log(current);
    return res.send(current);
  }
}
module.exports = { submit, findUserFromDatabase, searchSuggesstion, getDetails };