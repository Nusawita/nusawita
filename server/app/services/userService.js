const userRepository = require('../repositories/userRepository');
const sessionRepository = require('../repositories/sessionRepository');
const {dtoError} = require('../dto/dtoError');
const {dtoLogin} = require('../dto/dtoLogin');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');

class UserService {
    constructor(userRepository, sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository
    }

    async register(userData) {
        //check if username already exist
        const [userCheckUsername, errCheckUsername] = await this.userRepository.getUserByUsername(userData.username);
        if (userCheckUsername != null) { //if username already exist
            //create error message
            const jsonData = dtoError(409, 'Username already been taken', null);
            
            return jsonData //return error
        } else {
            //check if email already exist
            const [userCheckEmail, errCheckEmail] = await this.userRepository.getUserByEmail(userData.email);
            if (userCheckEmail != null) { 
                //create error message
                const jsonData = dtoError(409, 'Email already been taken', null);
                
                return jsonData
            } else {
                //encrypt user password
                userData.password = await bcrypt.hash(userData.password, 10);

                //send data to repsitory
                const errCreateUser = await this.userRepository.createUser(userData)
                if (errCreateUser != null){   // check if error occured when registering new user
                    const jsonData = dtoError(500, 'Internal server error', errCreateUser);
        
                    return jsonData
                }
            }
        }
        return null;
    }

    async login(loginData) {
        const [user, errUser] = await this.userRepository.getUserByUsername(loginData.username);

        //check if user exist
        if (user === null) {
            const jsonData = dtoError(401, 'Username or Password are invalid', null);
            return [null, null, jsonData] //return error
        }

        //check if user exist and password correct
        if (user && (await bcrypt.compare(loginData.password, user.password))) {
            const sessionToken = uuid.v4(); //create session token
            
            //create session expire date
            const now = new Date()
            const expireAt = new Date(+now + 86400000) //86400000 equal to one day
            
            //add session token to session table
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
                const jsonData = dtoError(500, 'Internal server error', errSession);
    
                return [null, null, jsonData]
            }

            const loggedUser = dtoLogin(user);

            return [loggedUser, session, null] //if success
        } else {    //if user or password incorrect
            const jsonData = dtoError(401, 'Username or Password are invalid', null);
            return [null, null, jsonData] //return error
        }
    }

    async logout(sessionToken) {
        const errLogout = await this.sessionRepository.deleteSession(sessionToken);
        if (errLogout != null) {
            const jsonData = dtoError(500, 'Internal Server Error', null);
            return jsonData;
        }

        return null;
    }
}

module.exports = UserService;