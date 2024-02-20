const express = require("express");
const router = express.Router();
const { packageCartController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/add", authVerifyToken, packageCartController.addToCart);
router.post("/remove", authVerifyToken, packageCartController.removeFromCart);
router.get("/get", authVerifyToken, packageCartController.getAllProducts);
router.post("/delete", authVerifyToken, packageCartController.deleteProduct);
router.delete("/delete/:cartId", packageCartController.deleteCart);

module.exports = router;
