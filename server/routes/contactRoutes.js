const express = require("express");
const router = express.Router();
const { contactController } = require("../controllers");

router.post("/create", contactController.contactUs);
router.get("/getAll", contactController.getAllContact);
router.post("/delete/:contactId", contactController.deleteContact);

module.exports = router;
