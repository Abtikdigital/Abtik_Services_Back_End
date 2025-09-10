const express=require("express")
const Router=express.Router()
const {addDownloadApplication}=require("../controller/eBookController")


Router.post("/addDownloadApplication",addDownloadApplication)



module.exports=Router