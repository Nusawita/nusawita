const checkUsername = require('./checkUsername');
const checkEmail = require('./checkEmail');

module.exports = {
    '/check-username':{
        ...checkUsername,
    },
    '/check-email':{
        ...checkEmail,
    },
}