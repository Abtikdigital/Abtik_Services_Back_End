const careerModel = require("../models/careerModel")
const careerValidationSchema = require("../validation/careerValidation")
const { firmTemplate, userTemplate } = require("../templates/careerTeamplate")
const { sendMail } = require("../utils/sendMail")
const addApplication = async (req, res) => {
    try {
        console.log(req)
        const firmMail = process?.env?.firmMail
        let { jobTitle,
            fullName,
            email,
            contactNumber,
            experience,
            expectedCtc,
            currentCtc,
            noticePeriod } = req.body

        let { error, value } = careerValidationSchema.validate({
            jobTitle,
            fullName,
            email,
            contactNumber,
            experience,
            expectedCtc,
            currentCtc,
            noticePeriod
        })
        console.log("this is running")

        if (error) {
            return res.status(403).json({ isSuccess: false, message: "Validation error", error })
        }
        let isAlreadyExist = await careerModel.findOne({ email })
        if (isAlreadyExist) {
            return res.status(409).json({ isSuccess: false, message: "Application is already exist" })
        }
        let newApplication = new careerModel({
            jobTitle,
            fullName,
            email,
            contactNumber,
            experience,
            expectedCtc,
            currentCtc,
            noticePeriod
        })
        let isSaved = await newApplication.save()
        if (isSaved) {
            const userSubject = "Your Application has been submitted"
            const firmSubject = "New Career Application has been recieved"
            await Promise.all([
                sendMail(firmMail, email, userSubject, userTemplate({ fullName })),
                sendMail(firmMail, firmMail, firmSubject, firmTemplate({
                    jobTitle,
                    fullName,
                    email,
                    contactNumber,
                    experience,
                    expectedCtc,
                    currentCtc,
                    noticePeriod
                }), [{
                    filename:req?.files?.resume?.name,          // e.g., 'Resume.pdf'
                    content:req?.files?.resume?.data,           // Buffer
                    contentType:req?.files?.resume?.mimetype    
                }]),

            ])
            return res.status(201).json({ isSuccess: true, message: "Application added successfully" })

        } else {
            return res.status(400).json({ isSuccess: false, message: "Error while inserting new application " })
        }

    } catch (error) {
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error", error })
    }
}

module.exports = { addApplication }