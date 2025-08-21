const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/dbConfig");
const contactRouter = require("./routes/contactRoutes");
const careerRouter = require("./routes/careerRoutes");
const otpRouter = require("./routes/otpRoutes");

const PORT = process?.env?.PORT;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [process?.env?.FRONT_END_URL, process?.env?.SECONDARY_DOMAIN],
    credentials: true,
  })
);
app.use(fileUpload());
app.use(express.json());
app.use("/contact", contactRouter);
app.use("/career", careerRouter);
app.use("/otp", otpRouter);

app.listen(PORT, () => {
  console.log(`PORT IS LISTEN ON ${PORT}`);
});
