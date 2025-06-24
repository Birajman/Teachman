const router = require('express').Router()
const UserController =  require('../Api/controller/userControler')
const user_ctrl = new UserController()

router.get("/", user_ctrl.all_user )

module.exports = router