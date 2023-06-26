const userRepository = require('../repositories/userRepository');
const sessionRepository = require('../repositories/sessionRepository');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

class UserService {
    constructor(userRepository, sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository
    }

    async register(userData) {
        //check if username already exist
        const userCheckUsername = await this.userRepository.getUserByUsername(userData.username);
        if (userCheckUsername != null) { //if username already exist
            const error = { //create error message
                status: 409,
                message: 'Username already been taken'
            }
            const jsonData = JSON.stringify(error)
            return jsonData //return error
        } else {
            //check if email already exist
            const userCheckEmail = await this.userRepository.getUserByEmail(userData.email);
            if (userCheckEmail != null) { //if email already exist
                const error = {
                    status: 409,
                    message: 'Email already been taken'
                }
                const jsonData = JSON.stringify(error)
                return jsonData
            } else {
                //encrypt user password
                userData.password = await bcrypt.hash(userData.password, 10);

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
        
        //check if user exist or not
        if (user === null) {
            const error = { //create error message
                status: 401,
                message: 'Username or Password are incorrect'
            }
            const jsonData = JSON.stringify(error)
            return [null, null, jsonData] //return error
        }

        //check password
        if (await bcrypt.compare(loginData.password, user.password)) {     //if password correct
            const sessionToken = uuid.v4(); //create session token
            
            //create session expire date
            const now = new Date()
            const expireAt = new Date(+now + 86400000) //86400000 equal to one day
            
            //add session token to session table
            //remember to create dto
            const sessionData = {
                id: sessionToken,
                userId: user.id,
                loginStatus: true,
                expirationTime: expireAt
            }

            //send session to repository
            const [session, errSession] = await this.sessionRepository.createSession(sessionData);
            
            //check if session succesfully created at database
            if (errSession != null) {
                const error = {
                    status: 500,
                    message: 'Internal server error',
                    err: errSession
                }
    
                const jsonData = JSON.stringify(error)
    
                return [null, null, jsonData]
            }

            const loggedUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                no_telp: user.no_telp,
                dob: user.dob,
                isAdmin: user.isAdmin,
                ban: user.ban
            }

            return [loggedUser, session, null] //if success
        } else {    //if password are incorrect
            const error = { //create error message
                status: 401,
                message: 'Username or Password are incorrect'
            }
            const jsonData = JSON.stringify(error)
            return [null, null, jsonData] //return error
        }
    }

    async logout(sessionToken) {
        const errLogout = await this.sessionRepository.deleteSession(sessionToken);
        if (errLogout != null) {
            const error = { //create error message
                status: 500,
                message: 'Internal Server Error'
            }
            const jsonData = JSON.stringify(error);
            return jsonData;
        }

        return null;
    }
}

module.exports = UserService;