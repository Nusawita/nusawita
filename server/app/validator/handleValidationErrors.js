const {validationResult} = require('express-validator');

exports.handleRegisterValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    }
    next();
}