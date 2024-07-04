const userModel = require("../../models/userModel");

async function updateUserDetailsController(req, res) {
  try {
    //get id from middleware session
    const sessionUser = req.userId;

    const { _id, email, name, role } = req.body;

   

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user = await userModel.findById(sessionUser);

    

    const updateUser = await userModel.findByIdAndUpdate(_id, payload);

    res.status(200).json({
      data: updateUser,
      message: "User Updated",
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

module.exports = updateUserDetailsController;
