const { ErrorHandler } = require("../middleware/errorHandler");
const Coupen = require("../models/coupenModel");
const cloudinary = require("cloudinary").v2;

const createCoupen = async (req, res, next) => {
    try {
        const { coupenCode } = req.body;

        if (!coupenCode) {
            next(new ErrorHandler(400, "coupenCode is required"));
        }

        let files = req.files ? req.files.coupenImages : null;
        console.log("files ", files);
        let coupenImages = [];

        if (files) {
            const result = await cloudinary.uploader.upload(files.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images",
            });

            console.log("result ", result);

            if (result && result.secure_url) {
                coupenImages.push(result.secure_url);
            } else {
                return res
                    .status(500)
                    .json({ message: "Failed to upload one or more images" });
            }
        }

        console.log("coupenImages ", coupenImages);

        const coupen = await Coupen.create({
            coupenCode,
            coupenImages
        });

        console.log("Coupen ", coupen);

        return res.status(201).json({
            success: true,
            message: `coupen added successfully`,
            coupen,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAllCoupen = async (req, res, next) => {
    try {

        // Fetch categories 
        const allCoupens = await Coupen.find();

        console.log("allCoupens", allCoupens)

        return res.status(200).json({
            success: true,
            msg: "Coupen retrieved successfully",
            allCoupens,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteCoupen = async (req, res, next) => {
    try {
        const coupenId = req.params.coupenId;
        console.log(coupenId);
        // Check if the coupen exists
        const coupen = await Coupen.findById(coupenId);
        if (!coupen) {
            throw new ErrorHandler(404, "Coupen not found");
        }

        console.log(coupen);
        // Delete the coupen
        await Coupen.findByIdAndDelete(coupenId);

        res.status(200).json({
            success: true,
            msg: "Coupen deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorHandler(500, "Error while deleting coupen"));
    }
};

module.exports = {
    createCoupen,
    getAllCoupen,
    deleteCoupen
}
