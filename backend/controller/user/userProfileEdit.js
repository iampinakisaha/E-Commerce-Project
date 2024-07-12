const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userProfileEditController(req, res) {
  try {
    const sessionUser = req.userId;
    const { password, name, _id, profilePic } = req.body;
    
    // Hash the password if it's provided
    let hashPassword;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      hashPassword = bcrypt.hashSync(password, salt);
    }

    // Build the payload
    const payload = {
      ...(name && { name: name }),
      ...(password && { password: hashPassword }),
      ...(profilePic && { profilePic: profilePic }),
    };
    
    const user = await userModel.findById(sessionUser);
   
    // Find the user and update
    const updateUser = await userModel.findByIdAndUpdate(_id, payload, { new: true });
    


    if (!updateUser) {
      throw new Error("User not found or update failed.");
    }

    // Respond with the updated user
    res.status(200).json({
      data: updateUser,
      success: true,
      error: false,
      message: "Profile Updated Successfully!",
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userProfileEditController;
