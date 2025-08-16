
const mongoose = require("mongoose")


const careerModel = mongoose.Schema({
    jobTitle: {
        required: true,
        trim: true,
        type: String
    },
    fullName: {
        required: true,
        trim: true,
        type: String
    },
    email: {
        required: true,
        trim: true,
        type: String
    },
    contactNumber:{
        required:true,
        trim:true,
        type:Number
    },
    experience: {
        required: true,
        trim: true,
        type: String
    },
    currentCtc: {
        required: true,
        type: String,
        trim: true
    },
    expectedCtc: {
        required: true,
        type: String,
        trim: true
    },
    noticePeriod: {
        required: true,
        type: String,
        trim: true
    },

}, { timestamps: true })

module.exports = mongoose.model("careerModel", careerModel)