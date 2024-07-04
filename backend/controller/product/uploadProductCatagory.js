const productCatagoryModel = require("../../models/productCatagoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function uploadProductCatagoryController(req, res) {
  try {
    //check if user is admin or not
    const sessionUser = req.userId;
    
    if (uploadProductPermission(sessionUser)) {
      
    const {catagoryName, catagoryType} = req.body
    const name = await productCatagoryModel.findOne({catagoryName})
    const type = await productCatagoryModel.findOne({catagoryType})
   
    if (name === catagoryName && type === catagoryType) {
      throw new Error("Catagory Combination already exist");
    }
      
      const uploadProductCatagory = new productCatagoryModel(req.body);
      const saveProductCatagory = await uploadProductCatagory.save();

      
      res.status(200).json({
        data: saveProductCatagory,
        message: "Product Catagory Uploaded Successfully.",
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

module.exports = uploadProductCatagoryController;
