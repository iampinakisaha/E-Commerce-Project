const userModel = require("../../../models/userModel");
const userOTPVerificationModel = require("../../../models/userOTPVerificationModel");
const bcrypt = require("bcryptjs");
const transporter = require("..//..//..//helpers//nodemailer");
async function userOTPVerificationController(req, res) {
  const { email } = req.body;

  if (!email) {
    throw new Error("Email is not valid.");
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found.");
    }

    const otp = `${Math.floor(Math.random() * 9000 + 1000)}`;

    //mail option
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "verify your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address</p>
      <p>This code <b>expires in 15 minutes</b></p>`,
    };

    const salt = bcrypt.genSaltSync(10);
    const hashedOTP = await bcrypt.hashSync(otp, salt); //pass password

    const payload = {
      userId: user._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 900000, //15 min
    };

    const userVerificationData = new userOTPVerificationModel(payload);

    const saveUserVerificationData = await userVerificationData.save();

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      data: {
        userId: user._id,
        email,
      },
      status: "PENDING",
      message: "Verification opt email sent!",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      status: "FAILED",
      success: false,
    });
  }
}

module.exports = userOTPVerificationController;
