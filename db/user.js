const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        unique : true
    },
    userName : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    profilePicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
},
{timestamps:true}
);

const userModel = mongoose.model("user",userSchema);

module.exports = {
    userModel
}