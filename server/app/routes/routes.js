const UserController = require('../controllers/userController');
const UserRepository = require('../repositories/userRepository');
const UserService = require('../services/userService');

const LocationController = require('../controllers/locationController');
const LocationRepository = require('../repositories/locationRepository');
const LocationService = require('../services/locationService');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
exports.userController = new UserController(userService);

const locationRepository = new LocationRepository();
const locationService = new LocationService(locationRepository, userRepository);
exports.locationController = new LocationController(locationService);