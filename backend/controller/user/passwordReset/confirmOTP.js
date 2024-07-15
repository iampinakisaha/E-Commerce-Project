const userModel = require("../../../models/userModel");
const userOTPVerificationModel = require("../../../models/userOTPVerificationModel");
const bcrypt = require("bcryptjs");

async function userOTPConfirmationController(req, res) {
  try {
    
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new Error("Please enter valid OTP.");
    } else {
      const {_id} = await userModel.findOne({email})
    
      const userOTPConfirmationRecord = await userOTPVerificationModel.find({
        userId: _id
      }).sort({ createdAt: -1 });
      
      if (!userOTPConfirmationRecord) {
        // no records found
        throw new Error(
          "Account doesn't exist or Already verified. Please SignUp/LogIn"
        );
      } else {
        

        // user otp record exists

        const { expiredAt } = userOTPConfirmationRecord[0];
        const hashedOTP = userOTPConfirmationRecord[0].otp;
        
        if (expiredAt < Date.now()) {
          
          // user otp record has expired
          await userOTPVerificationModel.deleteMany({ userId: _id });
          throw new Error("OTP has expired");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP); // need to pass plain otp first then hashed one

          if (!validOTP) {
            //provided OTP is wrong
          
            throw new Error("Invalid OTP. Please check and provide valid OTP.");
          } else {
           
            await new Promise((resolve) => setTimeout(() => resolve(), 4000)); // this will await for 4000 ms to deliver the response
            // as otp is valid update user in user model as verified: true
            const userUpdated = await userModel.updateOne({ _id }, { verified: true });
           
            const recordDeleted =  await userOTPVerificationModel.deleteMany({ userId: _id });
           
            
            res.status(201).json({
              status: "VERIFIED",
              message: "OTP Verified Successfully!",
              success: true,
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      status: "FAILED",
      success: false,
    });
  }
}

module.exports = userOTPConfirmationController;
