// UserRepository.js
const User = require('../models/User');

class UserRepository {
    async create(userData) {
        try {
            const createdUser = await User.create(userData);
            return createdUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
  
module.exports = UserRepository;