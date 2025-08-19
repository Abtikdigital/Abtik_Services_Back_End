const express=require("express")
const {addOtpDeatils,verifyOtp}=require("../controller/otpController")

const Router=express.Router()

Router.post("/addOtpDetails",addOtpDeatils)
Router.post("/verifyOtp",verifyOtp)


module.exports=Router

