const router = require('express').Router()
const AuthController = require('..//Api/controller/Auth.controller')
const auth_ctrl = new AuthController;

router.post('/register', auth_ctrl.register)
router.post('/login', auth_ctrl.login)

module.exports = router