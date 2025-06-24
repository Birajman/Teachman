const UserService = require("../services/user.service");
class UserController {
  constructor() {
    this.user_srv = new UserService();
  }
  all_user = async (req, res, next) => {
    try {
      let result = await this.user_srv.fetchAllDateUser();
      res.json({
        result: result,
        msg: "Fetched All User",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
