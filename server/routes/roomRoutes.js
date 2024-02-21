const express = require("express");
const router = express.Router();
const { roomController } = require("../controllers");
const { upload } = require("../middleware/multer.middleware");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.post("/create", authVerifyToken, roomController.createRoom);
router.get("/getAll", roomController.getAllRooms);
router.put("/edit/:id", authVerifyToken, roomController.editRoom);
router.get("/getSingle/:id", roomController.getSingleRoom);
router.post("/delete/:roomId", roomController.deleteRoom);

module.exports = router;
