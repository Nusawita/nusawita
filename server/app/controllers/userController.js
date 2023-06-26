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
            return res.send(errRegister)
        }

        //json message
        res.status(201).json({message: 'User created'});
    }

    //login
    async login(req, res) {
        const loginData = req.body;
        const [user, session, errLogin] = await this.userService.login(loginData);
        //if error occured
        if (errLogin != null) {
            return res.send(errLogin)
        }

        //create cookie
        res.cookie("session_token", session.id, {maxAge: session.expirationTime})

        //return success
        res.status(200).json(user);
    }

    //logout
    async logout(req, res) {
        const sessionToken = req.cookies["session_token"]
        //if there is no session or cookies
        if (!sessionToken) {
            res.status(401).end()
            return
        }

        //logoutt
        const errLogout = await this.userService.logout(sessionToken)
        if (errLogout != null) {
            return res.send(errLogout)
        }

        //delete cookies
        res.cookie("session_token", "", { expires: new Date() })

        res.status(201).json({message: 'Log out success'});
    }
}

module.exports = UserController;