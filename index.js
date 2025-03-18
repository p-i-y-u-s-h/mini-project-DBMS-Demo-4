require("dotenv").config();

const express = require("express");
const { authUserRouter } = require("./routes/auth.user");
const mongoose = require ("mongoose");

const app = express();

app.use(express.json());
app.use("/api/v1/user",authUserRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected to db");
    })
    app.listen(3000)
    console.log("server is running on port 3000")
}

main()