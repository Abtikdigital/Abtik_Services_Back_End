const contactModel = require("../models/contactModel");
const contactValidationSchema = require("../validation/contactValidation");
const { sendMail } = require("../utils/sendMail");
const { userTemplate, firmTemplate } = require("../templates/contactTemplate");

const addContactDetails = async (req, res) => {
  try {
    const firmMail = process?.env?.firmMail;
    const { name, number, email, companyName, serviceType, message } = req.body;

    const { error } = contactValidationSchema.validate({
      name,
      email,
      number,
      companyName,
      serviceType,
    });
    if (error) {
      return res
        .status(403)
        .json({ isSuccess: false, message: "Validation Error", error });
    }

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

    // Store contact data directly
    const newContactData = new contactModel(req.body);
    const isSaved = await newContactData.save();

    if (isSaved) {
      // Send confirmation emails
      const userSubject = "Your contact has been submitted";
      const firmSubject = "New Contact has been received";

      await Promise.all([
        sendMail(
          firmMail,
          email,
          userSubject,
          userTemplate({ name, email, number, message })
        ),
        sendMail(
          firmMail,
          firmMail,
          firmSubject,
          firmTemplate({
            name,
            email,
            number,
            message,
            companyName,
            serviceType,
          })
        ),
      ]);

      return res.status(201).json({
        isSuccess: true,
        message: "Your response has been successfully submitted",
      });
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Error while inserting contact data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { addContactDetails };
