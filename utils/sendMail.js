const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    auth: {
        user: process?.env?.firmMail,
        pass: process?.env?.firmPass
    },
    service: "gmail"
})



const sendMail = async (from, to, subject, template) => {
    try {
        let isSended = transporter.sendMail({ to, from, subject, html: template })
        if (isSended) {
            console.log("Mail Sended Successfully")
        } else {
            console.log("Error while sending mail")
        }
    } catch (error) {

    }
}
module.exports = { sendMail }