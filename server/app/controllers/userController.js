const userService = require('../services/userService');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async login(req, res) {
        // console.log('1');
        try {
            // console.log('2');
            const loginData = req.body;
            // console.log(loginData);
            const user = await this.userService.login(loginData);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); //fix error message
        }
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
}

module.exports = UserController;