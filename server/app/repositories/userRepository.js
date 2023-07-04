const User = require('../models/User');
const { Op } = require('sequelize')

class UserRepository {
    async createUser(userData) {
        try {
            const createdUser = await User.create(userData);
            return null;
        } catch (error) {
            return error
        }
    }

    async getUserByUserId(userId) {
        try{
            const user = await User.findOne({where: {id: `${userId}`}});
            return [user, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getUserByUsername(username) {
        try{
            const user = await User.findOne({where: {username: `${username}`}});
            return [user, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getUserByEmail(email) {
        try{
            const user = await User.findOne({where: {email: `${email}`}});
            return [user, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getAllUser(search) {
        try{
            const allUser = await User.findAll({where: 
                {
                    [Op.and] : [
                        {isAdmin: false},
                        {username: {[Op.substring]: `${search}`}}
                    ]
                }});
            return [allUser, null];
        }catch (error) {
            return [null, error]
        }
    }
}
  
module.exports = UserRepository;