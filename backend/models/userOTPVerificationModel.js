const mongoose = require('mongoose')

//create new user schema [ similar like creating table in relational db]
const  userOTPVerificationSchema = new mongoose.Schema({
 userId: string,
 otp: string,
 createdAt: Date,
 expiredAt: Date,
});

const userOTPVerificationModel = mongoose.model("userOTPVerification",userOTPVerificationSchema)


module.exports = userOTPVerificationModel
