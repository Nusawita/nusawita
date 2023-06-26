const express = require('express');

//for validation
const {validateRegister} = require('../../validator/registerValidator');
const {validateLogin} = require('../../validator/loginValidator');
const {handleValidationErrors} = require('../../validator/handleValidationErrors');

const newLocal = '../../controllers/userController';
const UserController = require(newLocal);
const UserRepository = require('../../repositories/userRepository');
const SessionRepository = require('../../repositories/sessionRepository');
const UserService = require('../../services/userService');

const router = express.Router();
const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const userService = new UserService(userRepository, sessionRepository);
const userController = new UserController(userService);

router.post('/register', validateRegister, handleValidationErrors, (req, res) => userController.register(req, res));
router.post('/login', validateLogin, handleValidationErrors, (req, res) => userController.login(req,res))
router.get('/logout', (req, res) => userController.logout(req,res));

module.exports = router