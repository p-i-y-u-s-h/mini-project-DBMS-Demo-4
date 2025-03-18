const { Router } = require("express");
const { userModel } = require("../db");
const jwt  = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");

const userRouter = Router();

userRouter.post("/signup",async(req,res)=>{
    const {userName,email,password} = req.body;

    await userModel.create({
        userName:userName,
        email:email,
        password:password
    })

    res.json({
        message:"Signup succeeded"
    })

});

userRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email:email,
        password:password
    });

    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_PASSWORD)

        res.json({
            token : token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
});

module.exports = {
    userRouter:userRouter
};