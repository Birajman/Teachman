const AuthModel = require("../model/auth.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
  validateDate = (data) => {
    let error = {};
    if (!data.firstName) {
      error.firstName = "First Name is mandatory";
    }
    if (!data.lastName) {
      error.lastName = "Last Name is mandatory";
    }
    if (!data.email) {
      error.email = "Email is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    if (!data.phone) {
      error.phone = "Phone Number is required";
    }
    if (!data.nationality) {
      error.nationality = "Nationality is required";
    }
    if (!data.dob) {
      error.dob = "Date of Birth is required";
    }
    if (!data.gender) {
      error.gender = "Gender is required";
    }
    if (data.password !== data.confirmPassword) {
      error.confirmPassword =
        "Confirm Password doesn't match to original Password";
    }
    if (Object.keys(error).length) {
      throw {
        status: 400,
        msg: error,
      };
    }
    return null;
  };
  registerService = async (data) => {
    try {
      let user_Data = new AuthModel(data);
      return await user_Data.save();
    } catch (err) {
      if (err.code === 11000) {
        let keys = Object.keys(err.keyPattern);
        throw keys.join(", ") + " should be unique";
      } else if (err) {
        throw {
          msg: err.message,
          status: 400,
        };
      } else {
        throw err;
      }
    }
  };
  validateLoginData = (data) => {
    let error = {};
    if (!data.email) {
      error.email = "Email is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    if (Object.keys(error).length) {
      throw {
        status: 400,
        msg: error,
      };
    }
    return null;
  };
  loginService = async (data) => {
    let user = await AuthModel.findOne({
      email: data.email,
    });
    if (user) {
      let valid = bcrypt.compareSync(data.password, user.password);
      if (valid) {
        return user;
      } else {
        throw {
          status: 400,
          msg: "Crendentials does not match",
        };
      }
    } else {
      throw {
        status: 400,
        msg: "User doesn't exists",
      };
    }
  };

  getAccesstoken = (payload) => {
    let token = jwt.sign(payload, "Teachman123");
    return token;
  };
}

module.exports = AuthService;
