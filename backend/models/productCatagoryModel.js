const mongoose = require('mongoose')

//create new product schema

const productCatagorySchema =  new mongoose.Schema({
  

  catagoryName: {
    type: String,
    required: true,
  },
  catagoryType: {
    type: String,
    required: true,
  },
  catagoryImage: [],
},{
  timestamps: true
})
productCatagorySchema.index({ catagoryName: 1, catagoryType: 1 }, { unique: true });

const productCatagoryModel = mongoose.model("productCatagory",productCatagorySchema)

module.exports = productCatagoryModel