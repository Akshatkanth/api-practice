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
    const {email, password} = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });

    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const passwordHash = await bcrypt.hash(password, 10);

    await OTP.findOneAndDelete({email});

    await OTP.create({
        email,
        otpHash,
        passwordHash,
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

    const user = await User.create({
        email,
        password: record.passwordHash,
        isVerified: true
  });

    await OTP.deleteOne({email});

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
  );

  res.json({token})
});


//post login
router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({email});
    if(!user)   return res.status(404).json({message:"User not found"});

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});



module.exports = router;