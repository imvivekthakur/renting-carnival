const express = require("express");
const router = express.Router();
const { coupenController } = require("../controllers");
const { upload } = require("../middleware/multer.middleware");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, coupenController.createCoupen);
router.get("/getAll", coupenController.getAllCoupen);
router.post("/delete/:coupenId", coupenController.deleteCoupen);

module.exports = router;
