const {body} = require('express-validator');

//to validate register request
exports.validateLocation = [
    body('name')
        .notEmpty().withMessage('name required')
        .isLength({ max:50 }).withMessage('name must be no more than 50 characte long'),
    body('address')
        .notEmpty().withMessage('address required'),
    body('description')
        .notEmpty().withMessage('description required')
];