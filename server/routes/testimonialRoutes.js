const express = require("express");
const router = express.Router();
const { testimonialController } = require("../controllers");
const { upload } = require("../middleware/multer.middleware");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, testimonialController.createTestimonial);
router.get("/getAll", testimonialController.getAllTestimonial);
router.delete("/delete/:id", authVerifyToken, testimonialController.deleteTestimonial);

module.exports = router;
