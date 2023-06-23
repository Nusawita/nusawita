const { DataTypes } = require("sequelize");
const sequelize = require("../connect-database")

// class User extends Model {}
const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    no_telp: {
        type: DataTypes.STRING,
        allownull: true // atur entar supaya admin wajib memasukan no telp
        //entar tambah validate hanya angka
    },
    dob: {
        type: DataTypes.DATE,
        allownull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allownull: false
    },
    ban: {
        type: DataTypes.INTEGER,
        allownull: true
    },
});

sequelize.sync()
    .then(() => {
        console.log('Model synchronized successfuly');
    })
    .catch((error) => {
        console.error('Error synchronizing model:', error);
    });

module.exports = User;