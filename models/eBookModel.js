

const mongoose = require("mongoose");

const eBookModel = mongoose.Schema(
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
    bookName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("eBookModel", eBookModel);
