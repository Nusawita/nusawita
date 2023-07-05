const userRepository = require('../repositories/userRepository');
const {dtoError} = require('../dto/dtoError');
const {dtoLogin} = require('../dto/dtoLogin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        //check if username already exist
        const [userCheckUsername, errCheckUsername] = await this.userRepository.getUserByUsername(userData.username);
        let usernameMessage = null;
        if (userCheckUsername != null) {
            usernameMessage = 'Username has already been taken';
        }

        //check if email already exist
        const [userCheckEmail, errCheckEmail] = await this.userRepository.getUserByEmail(userData.email);
        let emailMessage = null;
        if (userCheckEmail != null) {
            emailMessage = 'Email has already been taken';
        }

        if ((usernameMessage != null) || (emailMessage != null)) {
            const jsonData = dtoError(401, {username: usernameMessage, email: emailMessage})
            return jsonData;
        } else {
            //encrypt user password
            userData.password = await bcrypt.hash(userData.password, 10);

            //send data to repsitory
            const errCreateUser = await this.userRepository.createUser(userData);
            if (errCreateUser != null){   // check if error occured when registering new user
                const jsonData = dtoError(500, 'Internal server error');
    
                return jsonData;
            }

            return null;
        }
    }

    async login(loginData) {
        const [userByUsername, errUserByUsername] = await this.userRepository.getUserByUsername(loginData.username);
        const [userByEmail, errUserByEmail] = await this.userRepository.getUserByEmail(loginData.username);

        //check if user exist
        if (!(userByUsername || userByEmail)) {
            const jsonData = dtoError(401, 'Username or Password are invalid');
            return [null, null, jsonData] //return error
        }

        //insert to user
        let user = {}
        if (userByUsername) {
            user.id = userByUsername.id,
            user.username = userByUsername.username,
            user.email = userByUsername.email,
            user.isAdmin = userByUsername.isAdmin,
            user.password = userByUsername.password
        } else {
            user.id = userByEmail.id,
            user.username = userByEmail.username,
            user.email = userByEmail.email,
            user.isAdmin = userByEmail.isAdmin,
            user.password = userByEmail.password
        }

        //check if user exist and password correct
        if (user && (await bcrypt.compare(loginData.password, user.password))) {
            const payload = {
                id: user.id,
            }

            const option = {
                expiresIn: '1d'
            };

            const token = jwt.sign(payload, process.env.TOKEN_KEY, option);

            const loggedUser = {
                username: user.username,
                isAdmin: user.isAdmin,
            }

            return [loggedUser, token, null] //if success
        } else {    //if user or password incorrect
            const jsonData = dtoError(401, 'Username or Password are invalid');
            return [null, null, jsonData] //return error
        }
    }

    async getAllUser(user, search) {
        //get user by user id
        const [userLog, errUserLog] = await this.userRepository.getUserByUserId(user.id);
        if (errUserLog != null) {
            const jsonData = dtoError(500, 'Internal server error');
            return [null, jsonData];
        }

        //check if user is admin
        if (!userLog.isAdmin) {
            const jsonData = dtoError(401, 'Unauthorized User');
            return [null, jsonData];
        }

        //get all user
        const [allUser, errAllUser] = await this.userRepository.getAllUser(search)
        if (errAllUser != null) {
            const jsonData = dtoError(500, 'Internal Server Error');
            return [null, jsonData];
        }

        let allUsers = []

        for(let i = 0; i < allUser.length; i++) {
            allUsers.push(dtoLogin(allUser[i]))
        }

        return [allUsers, null];
    }

    async checkUsername(username) {
        //check if username already exist
        const [userCheckUsername, errCheckUsername] = await this.userRepository.getUserByUsername(username);
        if (userCheckUsername != null) {
            const jsonData = dtoError(401, 'Username has already been taken')
            return jsonData;
        }

        return null;
    }

    async checkEmail(email) {
        //check if email already exist
        const [userCheckEmail, errCheckEmail] = await this.userRepository.getUserByEmail(email);
        if (userCheckEmail != null) {
            const jsonData = dtoError(401, 'Email has already been taken')
            return jsonData;
        }

        return null;
    }
}

module.exports = UserService;