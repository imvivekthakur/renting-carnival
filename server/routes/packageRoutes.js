const express = require("express");
const router = express.Router();
const { packageController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, packageController.createPackage)
router.get("/getAll", packageController.getAllPackages);
router.get("/get/:packageId", packageController.getSinglePackage);
router.post("/update", authVerifyToken, packageController.updatePackage);
router.put("/edit/:id", authVerifyToken, packageController.editPackage);
router.delete("/delete/:packageId", authVerifyToken,packageController.deletePackage);

module.exports = router;
