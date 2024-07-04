const userModel = require("../../models/userModel");

async function allUserDetailsController(req, res) {
  try {
    // Fetch current user from middleware session
    const sessionUser = req.userId;

    // Fetch the user from the database using the session user ID
    const user = await userModel.findById(sessionUser);

    // Check if the user has the admin role
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        message: 'Permission denied: Only admins can update user details',
        error: true,
        success: false,
      });
    }

    // console.log("USER ROLE: ", user.role);

    // Fetch all users from the database
    const userList = await userModel.find({});

    res.status(200).json({
      data: userList,
      error: false,
      success: true,
      message: "User Details",
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUserDetailsController;
