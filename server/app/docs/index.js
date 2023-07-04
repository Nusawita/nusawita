const basicInfo = require('./basicInfo');
const apis = require('./apis');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const api = require('./api');

module.exports = {
    ...basicInfo,
    ...apis,
    ...servers,
    ...components,
    ...tags,
    ...api
};