const express = require('express');

//for validation
const {handleValidationErrors} = require('../../helper/handleValidationErrors');
const {validateRegister} = require('../../helper/registerValidator');
const {validateLogin} = require('../../helper/loginValidator');
const {userController} = require('../routes');
const auth = require('../../middleware/jwt_auth');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, (req, res) => userController.register(req, res));
router.post('/login', validateLogin, handleValidationErrors, (req, res) => userController.login(req,res))
<<<<<<< HEAD
router.get('/logout', (req, res) => userController.logout(req,res));
router.get('/dashboard', (req, res) => userController.profile(req,res)); //feature profile sebagai dashborad untuk sementara
=======
router.get('/logout', auth, (req, res) => userController.logout(req,res));

router.post('/check-username', (req, res) => userController.checkUsername(req, res));
router.post('/check-email', (req, res) => userController.checkEmail(req, res));

router.get('/admin/users', auth, (req, res) => userController.getAllUser(req, res));
>>>>>>> e9f89eece94f587fce01dd97e4b6f83ec086d840

module.exports = router