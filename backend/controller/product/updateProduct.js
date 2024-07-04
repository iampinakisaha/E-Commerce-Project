const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function updateProductController(req, res) {
  try {
    //check if user is admin or not
    const sessionUser = req.userId;
    
    if (uploadProductPermission(sessionUser)) {

      const { _id, ...resBody } = req.body;

      console.log(resBody)
      const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

      
      res.status(200).json({
        data: updateProduct,
        message: "Product Updated Successfully.",
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

module.exports = updateProductController;