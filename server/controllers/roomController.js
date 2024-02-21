const { ErrorHandler } = require("../middleware/errorHandler");
const Rooms = require("../models/roomModel");
const cloudinary = require("cloudinary").v2;


const createRoom = async (req, res, next) => {
    try {
        const { heading } = req.body;
        owner = req.user._id;

        if (req.user.role === "buyer") {
            next(new ErrorHandler(400, "Buyer cannot create a product"));
        }

        if (!heading) {
            next(new ErrorHandler(400, "heading is required"));
        }

        let files = req.files ? req.files.roomImages : null;
        console.log("files ", files);
        let roomImages = [];


        if (files) {
            const result = await cloudinary.uploader.upload(files.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images",
            });

            console.log("result ", result);

            if (result && result.secure_url) {
                roomImages.push(result.secure_url);
            } else {
                return res
                    .status(500)
                    .json({ message: "Failed to upload one or more images" });
            }
        }

        const room = await Rooms.create({
            heading,
            roomImages
        });

        console.log("room ", room);

        return res.status(201).json({
            success: true,
            msg: `Room added successfully`,
            room,
        });


    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllRooms = async (req, res, next) => {
    try {

        // Fetch categories 
        const allRooms = await Rooms.find();

        console.log("allRooms", allRooms)

        return res.status(200).json({
            success: true,
            msg: "Rooms retrieved successfully",
            allRooms,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteRoom = async (req, res, next) => {
    try {
        const roomId = req.params.roomId;
        console.log(roomId);
        // Check if the room exists
        const room = await Rooms.findById(roomId);
        if (!room) {
            throw new ErrorHandler(404, "Room not found.");
        }

        console.log(room);
        // Delete the room
        await Rooms.findByIdAndDelete(roomId);

        res.status(200).json({
            success: true,
            msg: "Room deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorHandler(500, "Error while deleting room"));
    }
};


const getSingleRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        const room = await Rooms.findById(roomId);

        if (!room) {
            next(new ErrorHandler(400, "Room not found"));
        }

        return res.status(200).json({
            success: true,
            room,
        });
    } catch (error) {
        console.log(error);
        return err.response;
    }
};


const editRoom = async (req, res, next) => {
    const { id } = req.params

    try {
        const response = await Rooms.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).json({ success: true, response: response })
    } catch (error) {
        res.status(500).json({ error: 'Error updating document' });
    }
}

module.exports = {
    createRoom,
    getAllRooms,
    deleteRoom,
    editRoom,
    getSingleRoom
}