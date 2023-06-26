const {DataTypes} = require("sequelize");
const sequelize = require("../connect-database")

const Session = sequelize.define('session', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    loginStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    expirationTime: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Session;