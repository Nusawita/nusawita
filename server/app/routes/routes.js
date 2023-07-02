const UserController = require('../controllers/userController');
const UserRepository = require('../repositories/userRepository');
const UserService = require('../services/userService');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
exports.userController = new UserController(userService);