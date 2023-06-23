const Sequelize = require('sequelize');

// Create a Sequelize instance and establish the database connection
const sequelize = new Sequelize('latihan_6', 'postgres', 'azerblaze195', {
  host: 'localhost',
  dialect: 'postgres',
});

//check connection to database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize