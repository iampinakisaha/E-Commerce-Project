const productCatagoryModel = require("../../models/productCatagoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function deleteCatagoryController(req, res) {
  
  try {
    //check if user is admin or not
    const sessionUser = req.userId;
    
    if (uploadProductPermission(sessionUser)) {

      const { _id, ...resBody } = req.body;
      
      
      const deleteCatagory = await productCatagoryModel.findByIdAndDelete(_id, resBody);

      
      res.status(200).json({
        data: deleteCatagory,
        message: "Catagory deleted Successfully.",
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

module.exports = deleteCatagoryController;