const register = require('./register');
const login = require('./login');
const logout = require('./logout');

module.exports = {
    '/register':{
        ...register,
    },
    '/login':{
        ...login,
    },
    '/logout':{
        ...logout,
    },
}