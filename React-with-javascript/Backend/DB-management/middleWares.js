const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10602014',
    password: 'Bea7HuV8nb',
    database: 'sql10602014',
    port: 3306
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Connection held');
})

const addUserToDB = async (name, email, password, age) => {
    let sql = 'insert into users set name=?, email=?, password=?, age=?';
    let values = [[name], [email], [password], [age]];
    connection.query(sql, values, (error, result) => {
        if (error) throw error;
        console.log('Values inserted successfully..');
    })


}
const getDatasFromDB = async () => {
    sql = 'select * from users';
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) reject(result);
            resolve(result);
        })
    })
}
module.exports = { addUserToDB, getDatasFromDB };