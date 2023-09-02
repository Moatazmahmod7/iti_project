const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userID:String
});

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;
