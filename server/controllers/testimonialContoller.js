const { ErrorHandler } = require("../middleware/errorHandler");
const Testimonial = require("../models/testimonialModel");
// const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const cloudinary = require("cloudinary").v2;

const createTestimonial = async (req, res, next) => {
    try {
        const { name, desc, title } = req.body;

        owner = req.user._id;

        if (req.user.role === "buyer") {
            next(new ErrorHandler(400, "Buyer cannot create a product"));
        }

        if (!name) {
            next(new ErrorHandler(400, "Name is required"));
        } else if (!desc) {
            next(new ErrorHandler(400, "Description is required"));
        } else if (!title) {
            next(new ErrorHandler(400, "title is required"));
        }

        let files = req.files ? req.files.testimonialImages : null;
        console.log("files ", files);
        let testimonialImages = [];

        if (files) {

            const result = await cloudinary.uploader.upload(files.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images",
            });

            console.log("result ", result);

            if (result && result.secure_url) {
                testimonialImages.push(result.secure_url);
            } else {
                return res
                    .status(500)
                    .json({ message: "Failed to upload one or more images" });
            }
        }

        const product = await Testimonial.create({
            name,
            desc,
            title,
            testimonialImages,

        });

        console.log("testimonial ", product);

        return res.status(201).json({
            success: true,
            msg: `Testimonial added successfully`,
            product,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAllTestimonial = async (req, res, next) => {
    try {
        const allTestimonials = await Testimonial.find({});
        res.status(200).json({
            success: true,
            msg: "All Testimonial retrieved successfully",
            allTestimonials,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonialId = req.params.id;
        console.log(testimonialId);
        // Check if the product exists
        const testimonial = await Testimonial.findById(testimonialId);
        if (!testimonial) {
            throw new ErrorHandler(404, "Testimonial not found");
        }

        console.log(testimonial);
        // Delete the testimonial
        await Testimonial.findByIdAndDelete(testimonialId);

        res.status(200).json({
            success: true,
            msg: "Testimonial deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorHandler(500, "Error while deleting testimonial"));
    }
};


module.exports = {
    createTestimonial,
    getAllTestimonial,
    deleteTestimonial
};
