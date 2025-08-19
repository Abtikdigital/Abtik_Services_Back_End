const joi = require("joi")

const contactValidationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    number: joi.number().required(),
    companyName:joi.string().required(),
    serviceType:joi.string().required(),

})
module.exports=contactValidationSchema