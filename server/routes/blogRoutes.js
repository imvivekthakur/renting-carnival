const express = require("express");
const router = express.Router();
const { blogController } = require("../controllers");

const { upload } = require("../middleware/multer.middleware");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, blogController.insertNewBlog);


module.exports = router;