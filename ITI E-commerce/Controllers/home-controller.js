const bcrypt = require("bcrypt");
const User = require("../Models/user-model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.sign_up = async (req, res, next) => {
  const userExistemail = await User.findOne({ email: req.body.email });
  const userExistuserName = await User.findOne({ userName: req.body.userName });

  if (userExistemail || userExistuserName)
    return res.json("user name and email must be unique");

  if (!validationResult(req).isEmpty()) {
    let arrErr = [];
    for (const err of validationResult(req).array()) {
      arrErr.push(err.msg);
    }
    return res.json(arrErr);
  }

  let newPass = await bcrypt.hash(req.body.password, 10);

  req.body.password = newPass;

  let newUser = await new User(req.body).save();

  res.json(newUser);
};

exports.log_in = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    let arrErr = [];
    for (const err of validationResult(req).array()) {
      arrErr.push(err.msg);
    }
    return res.json(arrErr);
  }

  let flag = 0;

  const userExist = await User.findOne({ email: req.body.email });

  if (!userExist) return res.json("email or password is uncorrect")

   flag++;

  let newPass = await bcrypt.compare(req.body.password, userExist.password);
  if (newPass) flag++;

  if (flag === 2) {
    const token = jwt.sign(
      {
        id: userExist._id,
        isAuth: true,
      },
      "any thing",{
        expiresIn:"7d"
      }
    );

    return res.json(token);
  } else res.json("email or password is uncorrect");
};
