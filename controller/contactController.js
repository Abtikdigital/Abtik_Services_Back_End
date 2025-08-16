const contactModel = require("../models/contactModel")
const { userTemplate, firmTemplate } = require("../templates/contactTemplate")
const { sendMail } = require("../utils/sendMail")
const contactValidationSchema = require("../validation/contactValidation")
const addContact = async (req, res) => {
    try {
        const firmMail = process?.env?.firmMail
        let { name, email, number, message, companyName } = req.body
        let isUserAlreadyExist = await contactModel.findOne({ email })
        if (isUserAlreadyExist) {
            return res.status(409).json({ isSuccess: false, message: "User is already exist" })
        }
        let { error, value } = contactValidationSchema.validate({ name, email, number, companyName })
        if (error) {
            return res.status(403).json({ isSuccess: false, message: "Validation Error", error })
        }
        let newContact = new contactModel(req.body)
        let isSaved = await newContact.save()
        const userSubject = "Your contact has been submitted"
        const firmSubject = "New Contact has been recieved"
        if (isSaved) {
            res.status(201).json({ isSuccess: true, message: "Contact Added Successfully" })
            await Promise.all([
                sendMail(firmMail, email, userSubject, userTemplate({ name, email, number, message })),
                sendMail(firmMail, firmMail, firmSubject, firmTemplate({ name, email, number, message }))
            ])
            return
        } else {
            return res.status(400).json({ isSuccess: false, message: "Error while inserting contact details" })
        }
    } catch (error) {
        res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}


module.exports = { addContact }