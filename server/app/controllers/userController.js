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
            return res.status(errRegister.status).json(errRegister)
        }

        //json message
        res.status(201).json({message: 'User created'});
    }

    //login
    async login(req, res) {
        const loginData = req.body;
        const [token, errLogin] = await this.userService.login(loginData);
        //if error occured
        if (errLogin != null) {
            return res.status(errLogin.status).json(errLogin)
        }

        //create cookie
        res.cookie("session_token", token, {maxAge: 86400000}) //86400000 equal to 1 day

        //return success
        res.status(200).json({message: 'User Log in'});
    }

    //logout
    async logout(req, res) {
        //delete cookies
        res.cookie("session_token", "", { expires: new Date() })

        res.status(201).json({message: 'Log out success'});
    }

    async getAllUser (req, res) {
        const user = req.user;

        //get query params
        const search = req.query.search;

        //get all user
        const [allUser, errAllUser] = await this.userService.getAllUser(user, search);
        if (errAllUser != null) {
            return res.status(errAllUser.status).json(errAllUser);
        }

        res.status(200).json(allUser);
    }

    async checkUsername (req, res) {
        const username = req.body.username;

        //check username
        const errUsername = await this.userService.checkUsername(username);
        if (errUsername != null) {
            return res.status(errUsername.status).json(errUsername);
        }

        res.status(200).end();
    }

    async checkEmail (req, res) {
        const email = req.body.email;

        //check email
        const errEmail = await this.userService.checkEmail(email);
        if (errEmail != null) {
            return res.status(errEmail.status).json(errEmail);
        }

        res.status(200).end();
    }
}

module.exports = UserController;