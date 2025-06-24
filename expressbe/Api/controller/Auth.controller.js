const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");
class AuthController {
  constructor() {
    this.auth_service = new AuthService();
  }
  register = async(req, res, next) => {
    try {
      let data = req.body;
      this.auth_service.validateDate(data);
      delete data.confirmPassword;
      data.password = bcrypt.hashSync(data.password, 10);
      let store = await this.auth_service.registerService(data);

      res.json({
        result: store,
        msg: "Registration process is completed",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  login = async(req, res, next) => {
    try{
      let data = req.body;
      this.auth_service.validateLoginData(data)
      let user = await this.auth_service.loginService(data)
      let token = this.auth_service.getAccesstoken({id: user._id});
        res.json({
        result: {
          user: user,
          token: token
        },
        msg: "Login Successfully",
        status: true
      })

    }catch(err){
      next(err)
    }
  }
}

module.exports = AuthController;
