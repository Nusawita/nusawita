const { check } = require('express-validator');
const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        //check if username already exist
        const userCheckUsername = await this.userRepository.getUserByUsername(userData.username);
        if (userCheckUsername.username) { //if username already exist
            const error = { //create error message
                status: 409,
                message: 'Username already been taken'
            }
            const jsonData = JSON.stringify(error)
            return jsonData //return error
        } else {
            //check if email already exist
            const userCheckEmail = await this.userRepository.getUserByEmail(userData.email);
            if (userCheckEmail.email) { //if email already exist
                const error = {
                    status: 409,
                    message: 'Email already been taken'
                }
                const jsonData = JSON.stringify(error)
                return jsonData
            } else {
                //send data to repsitory
                const err = await this.userRepository.createUser(userData)
                if (err != null){   // check if error occured when registering new user
                    const error = {
                        status: 500,
                        message: 'Internal server error',
                        err: err
                    }
        
                    const jsonData = JSON.stringify(error)
        
                    return jsonData
                }
            }
        }
        return null;
    }

    async login(loginData) {
        const user = await this.userRepository.getUserByUsername(loginData.username);
        if (user.password === loginData.password) {
            //create token
            //remmember to refactor token generator
            const payload = {
                userId: user.id,
                username: user.username,
            };

            const token = jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: '2h'});

            const loggedUser = {
                id: user.id,
                username: user.username,
                no_telp: user.no_telp,
                dob: user.dob,
                isAdmin: user.isAdmin,
                ban: user.ban,
                token: token
            }
            //user.token = token;
            
            return loggedUser;
        } else {
            return null
        }
    }
}

module.exports = UserService;