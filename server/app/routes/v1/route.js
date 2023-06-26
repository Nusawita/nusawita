const express = require('express');

//for validation
const {handleValidationErrors} = require('../../helper/handleValidationErrors');
const {validateRegister} = require('../../helper/registerValidator');
const {validateLogin} = require('../../helper/loginValidator');
const {userController} = require('../routes');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, (req, res) => userController.register(req, res));
router.post('/login', validateLogin, handleValidationErrors, (req, res) => userController.login(req,res))
router.get('/logout', (req, res) => userController.logout(req,res));

module.exports = router