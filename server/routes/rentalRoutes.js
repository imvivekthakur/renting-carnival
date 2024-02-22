const express = require("express");
const router = express.Router();
const { rentalController } = require("../controllers");
const { upload } = require("../middleware/multer.middleware");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, rentalController.createRental);
router.get("/getAll", rentalController.getAllRentals);
router.delete("/delete/:id", authVerifyToken, rentalController.deleteRental);

module.exports = router;
