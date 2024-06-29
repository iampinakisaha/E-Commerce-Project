const userModel = require("../models/userModel");

async function allUserDetailsController(req, res) {
  try {
    

    // Fetch all users from the database
    const user = await userModel.find({});

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Details",
    });

    // console.log(user);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUserDetailsController;