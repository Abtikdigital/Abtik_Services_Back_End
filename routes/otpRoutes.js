const express=require("express")
const {addContactDetails}=require("../controller/otpController")

const Router=express.Router()

Router.post("/addContactDetails",addContactDetails)

module.exports=Router

