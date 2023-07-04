const authorization = require('./authorization');
const admin = require('./admin')
const check = require('./check')

module.exports = {
    paths:{
        ...authorization,
        ...admin,
        ...check,
    }
}