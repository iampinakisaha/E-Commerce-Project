const userModel = require("../../../models/userModel");
const userOTPVerificationModel = require("../../../models/userOTPVerificationModel");
const bcrypt = require("bcryptjs");

async function userOTPConfirmationController(req, res) {
  try {
    console.log(req.body)
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new Error("Please enter valid OTP.");
    } else {
      const {_id} = await userModel.findOne({email})
      console.log("user found in user model", _id);
      const userOTPConfirmationRecord = await userOTPVerificationModel.find({
        userId: _id
      }).sort({ createdAt: -1 });
      console.log("userOTPConfirmationRecord", userOTPConfirmationRecord[0])
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
          console.log("error here........................")
          // user otp record has expired
          await userOTPVerificationModel.deleteMany({ userId: _id });
          throw new Error("OTP has expired");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP); // need to pass plain otp first then hashed one

          if (!validOTP) {
            //provided OTP is wrong
            console.log("otp invalid")
            throw new Error("Invalid OTP. Please check and provide valid OTP.");
          } else {
            console.log("otp verified")
            // as otp is valid update user in user model as verified: true
            const userUpdated = await userModel.updateOne({ _id }, { verified: true });
            console.log("user updated..................", userUpdated)
            const recordDeleted =  await userOTPVerificationModel.deleteMany({ userId: _id });
            console.log("records are deleted..............", recordDeleted)
            
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
