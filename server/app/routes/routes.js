const UserController = require('../controllers/userController');
const UserRepository = require('../repositories/userRepository');
const SessionRepository = require('../repositories/sessionRepository');
const UserService = require('../services/userService');

const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const userService = new UserService(userRepository, sessionRepository);
exports.userController = new UserController(userService);