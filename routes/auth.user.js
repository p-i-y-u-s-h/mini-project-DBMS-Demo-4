const { Router } = require("express");
const { userModel } = require("../db/user");
const jwt  = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");
const bcrypt = require("bcrypt");

const authUserRouter = Router();

authUserRouter.post("/signup",async(req,res)=>{
    try{
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
    } catch(err){
        res.status(500).json(err);
    }
    
});

authUserRouter.post("/signin",async (req,res)=>{
    try{
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
            userId:user._id
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
    } catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = {
    authUserRouter:authUserRouter
};