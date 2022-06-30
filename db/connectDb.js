const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const sequelize = new Sequelize(
    process.env.DATABASE_DB,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT,
        operatorsAliases: '',
        logging: false
    }
);

// Test the connection to database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {

        if(err.message.includes('Unknown database')) {

            return mysql.createConnection({ 
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD 
            })
            .then(connection => connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_DB}\`;`))

        }
        console.log('Unable to connect to the database:', err);

    });

// Export
module.exports = sequelize;