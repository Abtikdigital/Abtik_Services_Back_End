const eBookModel = require("../models/eBookModel");
const eBookValidationSchema = require("../validation/eBookValidation");

const addDownloadApplication = async (req, res) => {
  try {

    let { error } = eBookValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(403)
        .json({ isSuccess: false, message: "Validation Error", error });
    }

    let newDownloadApplication = new eBookModel(req.body);
    let isSaved = await newDownloadApplication.save();
    if (isSaved) {
      return res
        .status(201)
        .json({
          isSuccess: true,
          message: "Your response has been successfully submitted ",
        });
    } else {
      return res
        .status(400)
        .json({
          isSuccess: false,
          message: "Error while inserting download application",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

module.exports = { addDownloadApplication };
