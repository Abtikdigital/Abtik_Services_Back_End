const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');

require("dotenv").config();
require("./config/dbConfig");
const contactRouter = require("./routes/contactRoutes");
const careerRouter=require("./routes/careerRoutes")

const PORT = process?.env?.PORT;

const app = express();
app.use(cors({
    origin:process?.env?.FRONT_END_URL
}))
app.use(fileUpload())
app.use(express.json())
app.use("/contact", contactRouter);
app.use("/career",careerRouter)

app.listen(PORT, () => {
  console.log(`PORT IS LISTEN ON ${PORT}`);
});
