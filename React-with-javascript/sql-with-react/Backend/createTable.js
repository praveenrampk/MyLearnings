const mysql = require('mysql');

const pool = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10602014',
    password: 'Bea7HuV8nb',
    database: 'sql10602014',
    port: 3306
});


pool.connect((error) => {
    if (error) throw error;
    console.log('connected');

    pool.query('create table users (id int primary key auto_increment, name varchar(30), email varchar(30), password varchar(200), age int)', (error, result) => {
        if (error) throw error;
        console.log('Table created...');
    })
    // pool.query('drop table users', (error, result) => {
    //     if (error)  throw error;
    //     console.log('table droped...');
    // })
})
