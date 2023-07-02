const express = require('express');

//for validation
const {handleValidationErrors} = require('../../helper/handleValidationErrors');
const {validateRegister} = require('../../helper/registerValidator');
const {validateLogin} = require('../../helper/loginValidator');
const {userController} = require('../routes');
const auth = require('../../middleware/jwt_auth');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, (req, res) => userController.register(req, res));
router.post('/login', validateLogin, handleValidationErrors, (req, res) => userController.login(req,res))
router.get('/logout', auth, (req, res) => userController.logout(req,res));

router.post('/check-username', (req, res) => userController.checkUsername(req, res));
router.post('/check-email', (req, res) => userController.checkEmail(req, res));

router.get('/admin/users', auth, (req, res) => userController.getAllUser(req, res));

module.exports = router