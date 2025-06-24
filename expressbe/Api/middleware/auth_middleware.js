const jwt = require("jsonwebtoken");
const AuthModel = require("../model/auth.model");

const AuthCheck = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"];
    }

    if (req.headers["x-xsrf-token"]) {
      token = req.headers["authorization"];
    }

    if (req.query.token) {
      token = req.query.token;
    }
                                                
    if (token === null) {
      next({
        status: 401,
        msg: "UnAuthenticated",
      });
    } else {
      let parts = token.split(" ");
      token = parts.pop();

      jwt.verify(token,"Teachman123", async (err, data) => {
        if (err) {
          next({
            status: 403,
            msg: err.message,
          });
        } else {
          let user = await AuthModel.findById(data.id);
          if (user) {
            req.auth_user = user;
            next();
          } else {
            next({
              status: 403,
              msg: "Invalid Token or user doesnot exists.",
            });
          }
        }
      });
    }
  } catch (err) {
    next({
      status: 400,
      msg: err,
    });
  }
};

module.exports = AuthCheck;
