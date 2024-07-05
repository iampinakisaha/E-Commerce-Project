const productCatagoryModel = require("../../models/productCatagoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function getAllCatagoryController(req, res) {
  try {
    //check if user is admin or not
    const sessionUser = req.userId;

    if (uploadProductPermission(sessionUser)) {
      const catagoryList = await productCatagoryModel.find().sort({createdAt : -1});

      res.status(200).json({
        data: catagoryList,
        message: "Product Catagory Fetched Successfully.",
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

module.exports = getAllCatagoryController;