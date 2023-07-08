const getAllUser = require('./getAllUser');
const getUser = require('./getUser');
const banUser = require('./banUser');
const deleteUser = require('./deleteUser');

module.exports = {
    '/admin/users':{
        ...getAllUser,
    },
    '/admin/user/{id}':{
        ...getUser,
        ...deleteUser,
    },
    '/admin/user/{id}/ban':{
        ...banUser,
    },
}