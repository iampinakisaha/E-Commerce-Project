const userModel = require("../../../models/userModel");
const bcrypt = require('bcryptjs');

async function userchangePasswordController(req,res){
  try {
    const {email, password, confirmPassword } = req.body

    const user = await userModel.findOne({email})

    if(!user){
      throw new Error("User Doesn't exist. Please signUp")
    }

    if (!email){
      throw new Error("Please provide email")
    }
    if (!password && !confirmPassword && password !== confirmPassword){
      throw new Error("Either password invalid/ not matched. Please check password")
    }
   
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt); //pass password from signup form body

    const userPasswordUpdate = await userModel.findByIdAndUpdate(user._id, {password: hashPassword});

    res.status(200).json({
      error: false,
      success: true,
      message: "password Updated Successfully",
    });
    

  }catch(err){
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}


module.exports = userchangePasswordController