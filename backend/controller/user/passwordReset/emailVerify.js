const userModel = require("../../../models/userModel");

async function userEmailVerifyController(req, res) {

  try {

    const {email} = req.body

    const user = await userModel.findOne({email})

    
    if (user) {

      res.status(200).json({
        error: false,
        success: true,
        message: "Verification code sent to your Email",
      });
    } else{

      throw new Error("Email not found")
    }

    
  }catch(err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userEmailVerifyController