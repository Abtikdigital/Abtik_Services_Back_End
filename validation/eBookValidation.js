const joi = require("joi")

const eBookValidationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    number: joi.number().required(),
    companyName:joi.string().required(),
    bookName:joi.string().required(),

})
module.exports=eBookValidationSchema