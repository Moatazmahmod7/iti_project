const Product = require("../Models/product-model");
const Cart = require("../Models/cart-model");
const data = require("../Routes/Guards/isAuth");

exports.all_products = async (req, res, next) => {
  let products = await Product.find();
  res.json(products);
};

exports.get_cart = async (req, res, next) => {
  let cart = await Cart.find({ userID: data.id });
  console.log(cart.length);
  if (!cart.length) return res.json("Not found");
  res.json(cart);
};

exports.add_to_cart = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });

  if (product) {
    if (req.body.amount > product.amount)
      return res.json("We do not have enough amounts");

    let oldCarts = await Cart.find({ userID: data.id });
    let flag = false,
      oldCart,
      newAmount;

    for (const cart of oldCarts) {
      if (cart.name === req.body.name) {
        oldCart = cart;

        flag = true;
        break;
      }
    }

    if (flag) {
      newAmount = +oldCart.amount + +req.body.amount;

      if (newAmount > product.amount)
        return res.json("We do not have enough amounts");
      else {
        await Cart.updateOne(
          { userID: data.id },
          // { name: req.body.name },
          {
            $set: {
              name: req.body.name,
              amount: +newAmount,
              price: +newAmount * +product.price,
            },
          }
        );

        await Product.updateOne(
          { name: req.body.name },
          {
            $set: {
              amount: product.amount - req.body.amount,
            },
          }
        );

        res.json("Updated");
      }
    } else {
      req.body.userID = data.id;
      req.body.price = +req.body.amount * +product.price;

      await new Cart(req.body).save();
      await Product.updateOne(
        { name: req.body.name },
        {
          $set: {
            amount: product.amount - req.body.amount,
          },
        }
      );

      res.json("Done");
    }
  } else res.json("you added an unexist product");
};

exports.deleteOne_cart = async (req, res, next) => {
  let deleted = await Cart.deleteOne({ _id: req.params.id});
  if (deleted.deletedCount) res.json("Deleted");
  else res.json("Not found");
};

exports.deleteMany_cart = async (req, res, next) => {
  let deleted = await Cart.deleteMany({_id: req.params.id});

  if (deleted.deletedCount) res.json("Deleted");
  else res.json("Not found");
};
