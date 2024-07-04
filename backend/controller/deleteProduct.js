const productModel = require("../models/productModel");
const uploadProductPermission = require("../helpers/permission");

async function deleteProductController(req, res) {
  console.log(res.Body)
  try {
    //check if user is admin or not
    const sessionUser = req.userId;
    
    if (uploadProductPermission(sessionUser)) {

      const { _id, ...resBody } = req.body;
      
      
      const deleteProduct = await productModel.findByIdAndDelete(_id, resBody);

      
      res.status(200).json({
        data: deleteProduct,
        message: "Product deleted Successfully.",
        error: false,
        success: true,
      });
    } else {
      throw new Error("Permission Denied!!");
    }

  }catch(err){
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteProductController;