const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
  try {
    const {email, password, name } = req.body

    const user = await userModel.findOne({email})

    if(user){
      throw new Error("Already user exist")
    }

    if (!email){
      throw new Error("Please provide email")
    }
    if (!password){
      throw new Error("Please enter password")
    }
    if (!name){
      throw new Error("Please provide name")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt); //pass password from signup form body
    
    if (!hashPassword){
      throw new Error("Something is wrong.")
    }
    const payload = {
      ...req.body,
      password: hashPassword
    }

    const userData = new userModel(payload)
    const saveUser = await userData.save()
    await new Promise((resolve) => setTimeout(() => resolve(), 4000)); // this will await for 4000 ms to deliver the response
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully!"
    })

  }catch(err){
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignUpController