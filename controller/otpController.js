const otpModel = require("../models/otpModels");
const contactModel = require("../models/contactModel");
const contactValidationSchema = require("../validation/contactValidation");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
const { userOtpTemplate } = require("../templates/otpTemplate");
const { userTemplate, firmTemplate } = require("../templates/contactTemplate");

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const addOtpDeatils = async (req, res) => {
  try {
    const firmMail = process?.env?.firmMail;
    const { name, number, email, companyName, serviceType, message } =
      req?.body?.contactData;

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

    const otp = generateOtp();
    const newOtpData = new otpModel({
      otp,
      contactData: req?.body?.contactData,
    });

    const isSaved = await newOtpData.save();
    if (isSaved) {
      const token = jwt.sign({ _id: isSaved?._id }, process?.env?.secret_key, {
        expiresIn: "150s",
      });

      await sendMail(
        firmMail,
        email,
        "Your One-Time Password (OTP)",
        userOtpTemplate({ otp, name })
      );

      res.cookie("otpToken", token, {
        httpOnly: true,
        secure: true, // required for HTTPS (Netlify is HTTPS by default)
        sameSite: "None",

        maxAge: 150000,
      });

      return res.status(201).json({
        isSuccess: true,
        message: "Otp has been sent successfully",
      });
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Error while inserting otp data",
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

const verifyOtp = async (req, res) => {
  try {
    const { enteredOtp } = req.body;
    const firmMail = process?.env?.firmMail;

    const token = req?.cookies?.otpToken;

    if (!token) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Token is required" });
    }

    let isValidToken;
    try {
      isValidToken = jwt.verify(token, process?.env?.secret_key);
    } catch (err) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid Token" });
    }

    const otpData = await otpModel.findOne({ _id: isValidToken?._id });
    if (!otpData) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Data not found" });
    }

    if (Number(enteredOtp) !== Number(otpData?.otp)) {
      return res.status(400).json({ isSuccess: false, message: "Invalid OTP" });
    }

    const newContactData = new contactModel({
      ...otpData?.contactData,
    });
    const isSaved = await newContactData.save();

    if (isSaved) {
      const { name, email, number, message, companyName, serviceType } =
        otpData.contactData;

      res.clearCookie("otpToken");
      await otpModel.deleteOne({ _id: isValidToken?._id });

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
        message: "Error while inserting data",
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

module.exports = { addOtpDeatils, verifyOtp };
