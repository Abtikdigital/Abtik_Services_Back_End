const express=require("express")
const {addApplication}=require("../controller/careerController")
const Router=express.Router()

Router.post("/addApplication",addApplication)


module.exports=Router