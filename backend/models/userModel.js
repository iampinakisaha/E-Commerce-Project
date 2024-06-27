const mongoose = require('mongoose')

//create new user schema [ similar like creating table in relational db]
const  userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,

  },
  password: String,
  profilePic: String,
},{
  timestamps: true
})


const userModel = mongoose.model("user",userSchema)


module.exports = userModel