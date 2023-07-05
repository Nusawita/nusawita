const getAllUser = require('./getAllUser');

module.exports = {
    '/admin/users':{
        ...getAllUser,
    },
}