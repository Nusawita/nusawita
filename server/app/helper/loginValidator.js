const {body} = require('express-validator');

//to validate login request
exports.validateLogin = [
    body('username')
        .notEmpty().withMessage('Username required')
        .isLength({ min:8 }).withMessage('Username must be at least 8 characte long'),
    body('password')
        .notEmpty().withMessage('Password required')
        .isLength({min:8}).withMessage('Password must be at least 8 character long')
];