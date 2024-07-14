const productModel = require("../../models/productModel");

async function bagItemSearchController(req, res) {
  try {
    const itemIdArray = req.body;
    
    // Count occurrences of each ID in the array
    const idCountMap = itemIdArray.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const uniqueIds = Object.keys(idCountMap);

    const productList = await productModel.find({ _id: { $in: uniqueIds } });
    
    // Attach the count to each product
    const productWithCounts = productList.map(product => {
      return {
        ...product.toObject(),
        count: idCountMap[product._id]
      };
    });

    res.status(200).json({
      data: productWithCounts,
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

module.exports = bagItemSearchController;
