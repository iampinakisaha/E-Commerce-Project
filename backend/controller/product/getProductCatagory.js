const productCatagoryModel = require("../../models/productCatagoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function getAllCatagoryController(req, res) {
  try {
    //check if user is admin or not
    // const sessionUser = req.userId;

    const catagoryList = await productCatagoryModel.find();
    console.log(catagoryList)
    res.status(200).json({
      data: catagoryList,
      message: "Product  Fetched Successfully.",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = getAllCatagoryController;
