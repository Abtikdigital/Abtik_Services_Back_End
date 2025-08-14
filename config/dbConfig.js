const mongoose = require("mongoose");
mongoose
  .connect(process?.env?.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.log("Error While Database Connection", error);
  });
