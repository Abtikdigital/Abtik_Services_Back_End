const contactModel = require("../models/contactModel")
const { userTemplate, firmTemplate } = require("../templates/contactTemplate")
const { sendMail } = require("../utils/sendMail")
const contactValidationSchema = require("../validation/contactValidation")
const addContact = async (req, res) => {
    try {
     
        const firmMail = process?.env?.firmMail
        let { name, email, number, message, companyName, serviceType } = req.body
        
        // Check if user with same email and serviceType exists within 7 days
        let isServiceAndEmailExist = await contactModel
            .findOne({ email, serviceType })
            .sort({ createdAt: -1 });

        if (isServiceAndEmailExist) {
            const lastCreatedDate = new Date(isServiceAndEmailExist.createdAt);
            const nextAllowedDate = new Date(
                lastCreatedDate.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            if (Date.now() < nextAllowedDate) {
                return res
                    .status(400)
                    .json({ isSuccess: false, message: "Try after some time" });
            }
        }
        
        let { error, value } = contactValidationSchema.validate({ name, email, number, companyName, serviceType })
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
                sendMail(firmMail, firmMail, firmSubject, firmTemplate({ name, email, number, message, companyName, serviceType }))
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