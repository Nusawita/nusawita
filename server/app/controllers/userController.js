const userService = require('../services/userService');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        const userData = req.body;
        const errRegister = await this.userService.register(userData);
        if (errRegister != null) {
            return res.send(errRegister)
        }

        //json message
        res.status(201).json({message: 'User created'});
    }

    async login(req, res) {
        //login user
        const loginData = req.body;
        const [user, session, errLogin] = await this.userService.login(loginData);
        if (errLogin != null) {
            return res.send(errLogin)
        }

        //create cookie
        res.cookie("session_token", session.id, {maxAge: session.expirationTime})

        res.status(200).json(user);
    }

    async logout(req, res) {
        const sessionToken = req.cookies["session_token"]
        console.log(sessionToken);
        if (!sessionToken) {
            res.status(401).end()
            return
        }

        const errLogout = await this.userService.logout(sessionToken)
        if (errLogout != null) {
            return res.send(errLogout)
        }

        res.cookie("session_token", "", { expires: new Date() })

        res.status(201).json({message: 'Log out success'});
    }
}

module.exports = UserController;