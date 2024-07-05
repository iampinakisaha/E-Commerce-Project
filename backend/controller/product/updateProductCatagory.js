const productCatagoryModel = require("../../models/productCatagoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function updateProductCatagoryController(req, res) {
  try {
    //check if user is admin or not
    const sessionUser = req.userId;
    
    if (uploadProductPermission(sessionUser)) {

      const { _id, ...resBody } = req.body;

      
      const updateCatagory = await productCatagoryModel.findByIdAndUpdate(_id, resBody);

      
      res.status(200).json({
        data: updateCatagory,
        message: "Catagory Updated Successfully.",
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

module.exports = updateProductCatagoryController;
