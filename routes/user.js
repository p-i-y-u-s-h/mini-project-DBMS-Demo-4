const { Router } = require("express");
const { userModel } = require("../db");
const jwt  = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");
const bcrypt = require("bcrypt");

const userRouter = Router();

userRouter.post("/signup",async(req,res)=>{
    const {userName,email,password} = req.body;

    const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

    await userModel.create({
        userName:userName,
        email:email,
        password:hashedPassword
    })

    res.json({
        message:"Signup succeeded"
    })

});

userRouter.post("/signin",async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email:email
    });
    if(!user){
        res.status(404).json("user not found")
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        res.status(404).json("password is incorrect")
    }

    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_PASSWORD)
    
        res.status(200).json({
            user : user,
            token : token
        });
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
});

module.exports = {
    userRouter:userRouter
};