const Sequelize = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance and establish the database connection
const sequelize = new Sequelize("postgresql://postgres:TiO0v5gIjkJQT8WqckLM@containers-us-west-105.railway.app:7059/railway");

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