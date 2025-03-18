const jwt = require("jsonwebtoken");
const {JWT_PASSWORD} = require("../config");

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_PASSWORD)

    if(decoded){
        req.userId = decoded.indexOf;
        next()
    } else{
        res.status(403).json({
            message:"You are not singnrd in"
        })
    }
}

module.exports = {
    userMiddleware:userMiddleware
}