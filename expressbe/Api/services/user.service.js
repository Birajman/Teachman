const AuthModel = require("../model/auth.model");

class UserService {
  fetchAllDateUser = async () => {
    return await AuthModel.find();
  }; 
}

module.exports = UserService;
