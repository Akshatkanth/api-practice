const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const OTP = require("../models/otp")
const transporter = require("../utils/mailer")

const router = express.Router();

//generate otp 
const generateOTP = () => 
    Math.floor(100000 + Math.random() * 900000).toString();

//request otp 
router.post("/signup/request-otp", async(req, res) => {
    const {email} = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser)
    return res.status(400).json({ message: "User already exists" });

    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);

    await OTP.findOneAndDelete({email});

    await OTP.create({
        email,
        otpHash,
        expiresAt: Date.now() + 5 * 60 * 1000
    });

    await transporter.sendMail({
        to: email,
        subject: "Signup OTP",
        text: `Your OTP is ${otp}`
  });
    res.json({ message: "Signup OTP sent" });

});

//verify otp 
router.post("/signup/verify-otp", async (req, res) => {
    const {email, otp} = req.body;

    const record = await OTP.findOne({email});
    if(!record) return res.status(400).json({message:"OTP not found"});

    if(record.expiresAt < Date.now()){
        return res.status(400).json({message:"OTP expired"});
    }

    const valid = await bcrypt.compare(otp, record.otpHash);
    if(!valid) return res.status(400).json({message : "invalid otp"});

    await OTP.deleteOne({email});

    const token = jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn : "1h"
    });
    res.json({token})
});

module.exports = router;