const userRepository = require('../repositories/userRepository');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userData) {
        //send data to user repository
        const newUser = await this.userRepository.create(userData);
        return newUser;
    }
}

module.exports = UserService;