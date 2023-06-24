const {body} = require('express-validator');

exports.validateRegister = [
    body('username')
        .notEmpty().withMessage('Username required')
        .isLength({ min:8 }).withMessage('Username must be at least 8 characte long'),
    body('email')
        .notEmpty().withMessage('Email reuqired')
        .isEmail().withMessage('Invalid email address'),
    body('password')
        .notEmpty().withMessage('Password required')
        .isLength({min:8}).withMessage('Password mus be at least 8 character long'),
    body('no_telp')
        .custom(value => {
            if (!(Number(value))) {
                throw new Error('must be number')
            }
        }),
];