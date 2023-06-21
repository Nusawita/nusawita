const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('postgres://user:postgres:5432/nusawita')

class User extends Model {}
User.init({
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
}, { sequelize, modelName: 'user'});

sequelize.sync()
    .then(() => {
        console.log('Model synchronized successfuly');
    })
    .catch((error) => {
        console.error('Error synchronizing model:', error);
    });