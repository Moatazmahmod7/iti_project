const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  phoneNumber: Number,
  address: String,

});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
