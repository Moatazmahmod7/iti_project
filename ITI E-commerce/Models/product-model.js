const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  amount: Number,
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
