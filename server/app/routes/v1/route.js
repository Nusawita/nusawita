const express = require('express');

const newLocal = '../../controllers/userController';
const UserController = require(newLocal);
const UserRepository = require('../../repositories/userRepository');
const UserService = require('../../services/userService');

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/register', (req, res) => userController.createUser(req, res));

module.exports = router