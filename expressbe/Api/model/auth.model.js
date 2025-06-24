const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female", "other"],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  nationality: {
    type: String,
    enum: ["nepali", "indian"],
    default: "nepali"
  },
  phone: {
    type: Number
  },
  password: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    default: Date.now
  }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});

const AuthModel = mongoose.model("User", AuthSchema);
module.exports = AuthModel;
