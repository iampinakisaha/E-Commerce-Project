const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
  try {
    const {email, password} = req.body

    

    if (!email){
      throw new Error("Please Provide Email")
    }

    if (!password){
      throw new Error("Please enter password")
    }
    
    const user = await userModel.findOne({email})

    if(!user){
      throw new Error("User Not Found")
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("checkPassword",checkPassword)

    if(checkPassword){

      const tokenData = {
        _id : user._id,
        email : user.email,
      }
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
      
      const tokenOption = {
        httpOnly : true,
        secure : true,
      }
      await new Promise((resolve) => setTimeout(() => resolve(), 2000));
      res.cookie("token",token,tokenOption).status(200).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false
      })
    }else{
      throw new Error("Please check Password")
    }

  }catch(err){
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignInController