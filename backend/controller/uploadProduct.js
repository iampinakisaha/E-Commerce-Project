const productModel = require("../models/productModel");
const uploadProductPermission = require("../helpers/permission");

async function uploadProductController(req, res) {
  try {
    //check if user is admin or not
    const sessionUser = req.userId;
    
    if (uploadProductPermission(sessionUser)) {
      const uploadProduct = new productModel(req.body);
      const saveProduct = await uploadProduct.save();

      
      res.status(200).json({
        data: saveProduct,
        message: "Product Uploaded Successfully.",
        error: false,
        success: true,
      });
    } else {
      throw new Error("Permission Denied!!");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadProductController;
