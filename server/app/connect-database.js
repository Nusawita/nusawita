const Sequelize = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance and establish the database connection
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: process.env.PG_DIALECT,
});

//check connection to database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

//create table in database
sequelize.sync()
  .then(() => {
      console.log('Model synchronized successfuly');
  })
  .catch((error) => {
      console.error('Error synchronizing model:', error);
  });

module.exports = sequelize