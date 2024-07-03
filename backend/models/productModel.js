const mongoose = require('mongoose')

//create new product schema

const productSchema =  new mongoose.Schema({
  productName: String,
  brandName: String,
  catagory: String,
  productImage: [],
  description: String,
  price: Number,
  selling: Number,
},{
  timestamps: true
})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel