const { ErrorHandler } = require("../middleware/errorHandler");
const Category = require("../models/categoriesModel");
// const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const cloudinary = require("cloudinary").v2;

const createCategory = async (req, res, next) => {
    try {
        const { name, featured } = req.body;

        if (!name) {
            next(new ErrorHandler(400, "Name is required"));
        }

        let files = req.files ? req.files.categoryImages : null;
        console.log("files ", files);
        let categoryImages = [];

        if (files) {
            const result = await cloudinary.uploader.upload(files.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images",
            });

            console.log("result ", result);

            if (result && result.secure_url) {
                categoryImages.push(result.secure_url);
            } else {
                return res
                    .status(500)
                    .json({ message: "Failed to upload one or more images" });
            }
        }

        console.log("categoryImages ", categoryImages);

        const category = await Category.create({
            name,
            categoryImages,
            featured
        });

        console.log("Category ", category);

        return res.status(201).json({
            success: true,
            message: `Category added successfully`,
            category,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const getAllCategories = async (req, res, next) => {
    try {

        // Fetch categories 
        const allCategories = await Category.find();

        console.log("allCategries", allCategories)

        return res.status(200).json({
            success: true,
            msg: "Category retrieved successfully",
            allCategories,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    createCategory,
    getAllCategories
}