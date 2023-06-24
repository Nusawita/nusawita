const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userData) {
        //send data to user repository
        const newUser = await this.userRepository.create(userData);
        return newUser;
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