const express = require("express")
const User = require("../models/user")
const authMiddleware = require("../middleware/auth")

const router = express.Router();

//Get user profile
router.get("/profile", authMiddleware, async (req, res) =>{
    try{
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    }catch(error){
        res.status(500).json({
            message:"Error fetching profile",
            error:error.message
        });
        
    }   
});

//Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
    try{
        const {name, bio} = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            {name, bio},
            {new:true, runValidators:true}
        ).select("-password");

        if(!user) return res.status(404).json({message:"User not found"});

        res.json(user);
    }catch(error){
        res.status(500).json({
            message:"Error updating profile",
            error:error.message
        });
    }
});

module.exports = router;