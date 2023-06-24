const express = require('express');

//for validation
const {validateRegister} = require('../../validator/registerValidator');
const {handleValidationErrors} = require('../../validator/handleValidationErrors');

const newLocal = '../../controllers/userController';
const UserController = require(newLocal);
const UserRepository = require('../../repositories/userRepository');
const UserService = require('../../services/userService');

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/register', validateRegister, handleValidationErrors, (req, res) => userController.createUser(req, res));

module.exports = router