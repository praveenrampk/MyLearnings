const { addUserToDB, getDatasFromDB } = require('../DB-management/middleWares');

const submit = async (req, res) => {
    const { name, email, password, age } = req.body;
    await addUserToDB(name, email, password, age);
    return res.send('You have Successfuly Registered...');
}
const getDetails = async (req, res) => {
    const result = await getDatasFromDB();
    res.status(200).json({result: result});
    console.log(result);
}
module.exports = { submit, getDetails };