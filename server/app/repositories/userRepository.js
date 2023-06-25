// UserRepository.js
const User = require('../models/User');

class UserRepository {
    async createUser(userData) {
        try {
            const createdUser = await User.create(userData);
            return null;
        } catch (error) {
            return error
        }
    }

    async getUserByUsername(username) {
        try{
            const user = await User.findOne({where: {username: `${username}`}});
            return user;
        } catch (error) {
            // console.log(error);
            return error;
        }
    }

    async getUserByEmail(email) {
        try{
            const user = await User.findOne({where: {email: `${email}`}});
            return user;
        } catch (error) {
            return error;
        }
    }
}
  
module.exports = UserRepository;