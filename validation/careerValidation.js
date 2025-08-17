const joi = require("joi")



const careerValidationSchema = joi.object({
    jobTitle: joi.string().required(),
    fullName: joi.string().required(),
    email: joi.string().required(),
    contactNumber: joi.string().required(),
    experience: joi.string().required(),
    currentCtc: joi.string().required(),
    expectedCtc: joi.string().required(),
    noticePeriod: joi.string().required()
})


module.exports = careerValidationSchema