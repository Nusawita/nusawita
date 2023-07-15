const {DataTypes} = require("sequelize");
const sequelize = require("../connect-database")

// class User extends Model {}
const Location = sequelize.define('location',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Location;