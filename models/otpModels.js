const mongoose = require("mongoose");

const otpModel = mongoose.Schema(
  {
    otp: {
      type: Number,
      required: true,
      trim: true,
    },
    contactData: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      companyName: { type: String, required: true },
      number: { type: Number, required: true },
      serviceType: { type: String, required: true },
      message: { type: String },
    },
    expiresAt: {
      type: Date,
      index: { expires: 150 },
       default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("otpModel", otpModel);
