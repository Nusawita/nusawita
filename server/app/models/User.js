const {DataTypes } = require("sequelize");
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
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    no_telp: {
        type: DataTypes.STRING,
        allowNull: true // atur entar supaya admin wajib memasukan no telp
        //entar tambah validate hanya angka
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ban: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

module.exports = User;