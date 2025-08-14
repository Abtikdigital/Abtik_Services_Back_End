const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/dbConfig");
const contactRouter = require("./routes/contactRoutes");

const PORT = process?.env?.PORT;

const app = express();
app.use(cors({
    origin:process?.env?.FRONT_END_URL
}))
app.use(express.json())
app.use("/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`PORT IS LISTEN ON ${PORT}`);
});
