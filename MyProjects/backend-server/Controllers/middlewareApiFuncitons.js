const mongodb = require('mongodb');
const { throwDataBase } = require('../Modles/connectDb');
const ObjectId =  mongodb.ObjectId

const   submit = async (req, res) => {
  const database = await throwDataBase();
  const { 
    firstName, 
    lastName, 
    email, 
    password, 
    age 
  } = req.body;
  let refId = null;
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
  const { email, password } = req.body;
  const database = await throwDataBase();
  const collection = database.collection('users');
  const current = await collection.findOne(req.body)
  console.log(current);
  if (!current)
    return res.status(400).send('Email | Password Not matches');
  else {
    if (current.password === req.body.password)
      return res.status(200).send(current);
  }
}

const findUsersTask = async (req, res) => {
  const database = await throwDataBase();
  const taskCollection = database.collection('tasks');

  const current = await taskCollection.findOne({ user: new ObjectId(req.body._id) });
  if (!current) {
    return res.status(400).send('User Not Found');
  }
  return res.status(200).send(current.tasks);
}

const searchSuggesstion = async (req, res) => {
  const params = String(req.params.name);
  const database = await throwDataBase();
  const collection = database.collection('users');
  let current = await collection.find().toArray(); 
  current = current.filter((user) => {
    if (params.toLowerCase() === user.firstName.slice(0, params.length).toLowerCase() || params.toLowerCase() === user.lastName.slice(0, params.length).toLowerCase())
      return true;
    return false;
  })
  res.send(current); 
}

const getAllUsersDetails = async (req, res) => {
  const database = await throwDataBase();
  const collection = database.collection('users');
  const current = await collection.find().toArray();
  if (current)
    return res.send(current);
}

const addTaskToUser = async (req, res) => {
  const { _id, name, task } = req.body;
  const database = throwDataBase();
  const collection = (await database).collection('tasks');

  let myUser = await collection.findOne({ user: new ObjectId(_id) });
  console.log(myUser);
  if (!myUser) {
    myUser = {
      user: new ObjectId(_id),
      name: name,
      tasks: [
        {
          id: Math.random(),
          todoValue: task,
          completed: false,
          date: new Date().toLocaleDateString(),
        },
      ],
    };
    await collection.insertOne(myUser);
  } else {
    myUser.tasks.push({
      id: Math.random(),
      todoValue: task,
      completed: false,
      date: new Date().toLocaleDateString(),
    });
    await collection.updateOne({ user: new ObjectId(_id) }, { $set: { tasks: myUser.tasks } });
  }
  res.status(200).send(myUser.tasks);
}

const completedOrNot = async (req, res) => {
  const { _id, userId } = req.body;
  const database = await throwDataBase();
  const taskCollection = database.collection('tasks');

  const user = await taskCollection.findOne({ user: new ObjectId(_id) });
  const tasks = user.tasks.map((user) => {
    if (user.id === userId) {
      user.completed = !user.completed;
      return user;
    }
    return user;
  })

  await taskCollection.updateOne({ user: new ObjectId(_id) }, { $set: { tasks: tasks }})
  return res.status(200).send(user.tasks);
}

const updatePersonTodo = async (req, res) => {
  const { _id, id, editValue } = req.body;
  const database = await throwDataBase();
  const taskCollection = database.collection('tasks');

  const user = await taskCollection.findOne({ user: new ObjectId(_id) });

  const tasks = user.tasks.map((user) => {
    if (user.id === (id)) {
      user.todoValue = editValue;
      return user;
    }
    return user;
  })
  await taskCollection.updateOne({ user: new ObjectId(_id) }, { $set: { tasks: tasks }});
  return res.status(200).send(user.tasks);
}

const deleteTodoValue = async (req, res) => {
  const { _id, id } = req.body;
  const database = await throwDataBase();
  const taskCollection = database.collection('tasks');

  const user = await taskCollection.findOne({ user: new ObjectId(_id) });
  
  const tasks = user.tasks.filter((use) => {
    if (use.id === id) {
      return false;
    }
    return true;
  })
  await taskCollection.updateOne({ user: new ObjectId(_id) }, { $set: { tasks: tasks }})
  return res.status(200).send(tasks);
}

const fetchDateFromTasks = async (req, res) => {
  let ids = req.params.ids;
  ids = ids.split(' ');
  let [_id, id] = ids;
  _id = String(_id);
  id = Number(id);
  
  const database = await throwDataBase();
  const taskCollection = database.collection('tasks');
  const user = await taskCollection.findOne({ user: new ObjectId(_id) });
  let date = user.tasks.filter((user) => {
    if (user.id === id) {
      return true;
    }
    return false;
  })
  date = date.pop();
  return res.status(200).send(date.date);
}

const updateTodoDate = async (req, res) => {
  const { _id, id, date } = req.body;
  console.log(date);
  const database = await throwDataBase();
  const taskCollection = database.collection('tasks');
  const user = await taskCollection.findOne({ user: new ObjectId(_id) });
  
  const tasks = user.tasks.map((user) => {
    if (user.id === id) {
      user.date = date;
      return user;
    }
    return user;
  })
  await taskCollection.updateOne({ user: new ObjectId(_id) }, { $set: { tasks: tasks }});
  return res.status(200).send(user.tasks);
}

const searchPersonsTodo = async (req, res) => {
  let {from, to, id} = req.query;
  console.log('from: ', from, 'to: ', to, 'id: ', id);

  const database = await throwDataBase();
  const userCollection = database.collection('users');
  const taskCollection = database.collection('tasks');

  const user = await taskCollection.findOne({ user: new ObjectId(id) });
  let myTasks = user.tasks.filter((task) => {
    if (task.date >= from && task.date <= to) {
      return true;
    }
    return false;
  })
  return res.status(200).send(myTasks);
}

module.exports = { 
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
};