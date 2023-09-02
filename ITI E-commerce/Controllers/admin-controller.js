const Product = require("../Models/product-model");
const User = require("../Models/user-model");
const Cart = require("../Models/cart-model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    let arrErr = [];
    for (const err of validationResult(req).array()) {
      arrErr.push(err.msg);
    }
    return res.json(arrErr);
  }

  let flag = 0;

  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) flag++;

  let newPass = await bcrypt.compare(req.body.password, userExist.password);
  if (newPass) flag++;

  if (flag === 2) {
    const token = jwt.sign(
      {
        id: userExist._id,
        isAdmin: true,
      },
      "many things",
      {
        expiresIn:"7d"
      }
    );

    return res.json(token);
  } else res.json("email or password is uncorrect");
};

exports.all_products = async (req, res, next) => {
  let products = await Product.find();
  res.json(products);
};

exports.one_product = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });
  res.json(product);
};

exports.add_product = async (req, res, next) => {
  let product = await Product.findOne({ name: req.body.name });

  if (product) return res.json("product already exists");

  let newProduct = await new Product(req.body).save();

  res.json(newProduct);
};

exports.update_product = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });

  if (!product) return res.json("product not found");

  let newProduct = await Product.updateOne({ _id: product._id }, req.body);

  res.json("updated");
};

exports.deleteOne_product = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });

  if (!product) return res.json("product not found");

  await Product.deleteOne({ _id: product._id });

  res.json("deleted");
};

exports.deleteMany_product = async (req, res, next) => {
  await Product.deleteMany();

  res.json("deleted");
};

exports.all_users = async (req, res, next) => {
  let users = await User.find();
  res.json(users);
};

exports.delete_user = async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });

  await Cart.deleteMany({ userID: user._id });
  await User.deleteOne({ _id: user._id });

  res.json("deleted");
};
