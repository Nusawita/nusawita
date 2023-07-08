const userService = require('../services/userService');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    //register
    async register(req, res) {
        const userData = req.body;
        const errRegister = await this.userService.register(userData);
        //if error occured
        if (errRegister != null) {
            return res.status(errRegister.status).json({message: errRegister.message})
        }

        //json message
        res.status(201).json({message: 'User created'});
    }

    //login
    async login(req, res) {
        const loginData = req.body;
        const [user, token, errLogin] = await this.userService.login(loginData);
        //if error occured
        if (errLogin != null) {
            return res.status(errLogin.status).json({
                message: errLogin.message,
                data: null,
            });
        }

        //create cookie
        res.cookie("session_token", token, {maxAge: 86400000}) //86400000 equal to 1 day

        //return success
        res.status(200).json({
            message: 'User Log in',
            data: user
        });
    }

    //logout
    async logout(req, res) {
        //delete cookies
        res.cookie("session_token", "", { expires: new Date() })

        res.status(200).json({message: 'Log out success'});
    }

    async getAllUser (req, res) {
        const user = req.user;

        //get query params
        const search = req.query.search;

        //get all user
        const [allUser, errAllUser] = await this.userService.getAllUser(user, search);
        if (errAllUser != null) {
            return res.status(errAllUser.status).json({
                message: errAllUser.message,
                data: null
            });
        }

        res.status(200).json({
            message: "success get all user",
            data: allUser});
    }

    async getUser (req, res) {
        const logUser = req.user;

        const userId = req.params.id;

        //get user by id
        const [user, errUser] = await this.userService.getUser(logUser, userId)
        if (errUser != null) {
            return res.status(errUser.status).json({
                message: errUser.message,
                data: null
            });
        }

        return res.status(200).json({
            message: "success get user",
            data: user
        });
    }

    async banUser (req, res) {
        const logUser = req.user;

        //get user id and ban value
        const userId = req.params.id;
        const ban = req.body.ban;

        //ban user
        const errBan = await this.userService.banUser(logUser, userId, ban);
        if (errBan != null) {
            return res.status(errBan.status).json({message: errBan.message});
        }

        return res.status(200).json({message: "User banned"});
    }

    async deleteUser (req, res) {
        const logUser = req.user;

        const userId = req.params.id;

        //delete user
        const errDeleteUser = await this.userService.deleteUser(logUser, userId);
        if (errDeleteUser != null) {
            return res.status(errDeleteUser.status).json({message: errDeleteUser.message});
        }

        return res.status(200).json({message: "User deleted"});
    }

    async checkUsername (req, res) {
        const username = req.body.username;

        //check username
        const errUsername = await this.userService.checkUsername(username);
        if (errUsername != null) {
            return res.status(errUsername.status).end();
        }

        res.status(200).end();
    }

    async checkEmail (req, res) {
        const email = req.body.email;

        //check email
        const errEmail = await this.userService.checkEmail(email);
        if (errEmail != null) {
            return res.status(errEmail.status).end();
        }

        res.status(200).end();
    }
}

module.exports = UserController;