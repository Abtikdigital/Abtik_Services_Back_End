const express = require("express")
const { addContact } = require("../controller/contactController")

const router = express.Router()

router.post("/addContact", addContact)

module.exports = router