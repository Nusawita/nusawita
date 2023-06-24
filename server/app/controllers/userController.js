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

    async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = UserController;