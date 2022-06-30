const Sequelize = require('sequelize');

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
        console.log('Unable to connect to the database:', err);
    });

// Export
module.exports = sequelize;