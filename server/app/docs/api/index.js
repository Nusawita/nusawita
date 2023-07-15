const authorization = require('./authorization');
const admin = require('./admin')
const check = require('./check')
const location = require('./location')


module.exports = {
    paths:{
        ...authorization,
        ...admin,
        ...check,
        ...location,
    }
}