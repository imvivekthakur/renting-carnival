const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { upload } = require("../middleware/multer.middleware");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, categoryController.createCategory);
router.get("/getAll", categoryController.getAllCategories);

module.exports = router;
