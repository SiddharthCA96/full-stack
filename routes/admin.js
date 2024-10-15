const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User } = require("../db");
const JWT_SECRET = require("../config");
const router = Router();
const jwt=require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    //check if user already exits(lets say ki for this ik baarhi kra)
    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        message:'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    const user=await User.find({
        username,
        password
    })
    if(user){
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.json({
            message:"incorrect email and password"
        })
    }
 
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;