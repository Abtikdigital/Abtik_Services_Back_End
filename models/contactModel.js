const mongoose = require("mongoose");

const contactModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        number: {
            type: Number,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("contactModel", contactModel);
