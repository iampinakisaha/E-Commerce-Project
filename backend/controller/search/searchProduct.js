const productModel = require("../../models/productModel");

async function searchProductController(req, res) {
  try {
    
    const { productName, brandName, catagory, price, description } = req.body;

   

    // Build the payload with the available search criteria
    const payload = {
      ...(productName && { productName: { $regex: productName, $options: "i" } }),
      ...(brandName && { brandName: { $regex: brandName, $options: "i" } }),
      ...(description && { description: { $regex: description, $options: "i" } }),
      ...(catagory && { catagory: catagory }),
      ...(price && { price: { $lte: price } }),
    };

  

    const productList = await productModel.find(payload).sort({ updatedAt: -1 });
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    res.status(200).json({
      data: productList,
      message: "Product Fetched Successfully.",
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

module.exports = searchProductController;
