const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function getAllProductController(req, res) {
  try {
    //check if user is admin or not
    const sessionUser = req.userId;

    if (uploadProductPermission(sessionUser)) {
      const productList = await productModel.find().sort({createdAt : -1});

      res.status(200).json({
        data: productList,
        // message: "Product Fetched Successfully.",
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

module.exports = getAllProductController;