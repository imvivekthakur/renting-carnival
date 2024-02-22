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


const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        console.log(categoryId);
        // Check if the coupen exists
        const coupen = await Category.findById(categoryId);
        if (!coupen) {
            throw new ErrorHandler(404, "Category not found.");
        }

        console.log(coupen);
        // Delete the coupen
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({
            success: true,
            msg: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorHandler(500, "Error while deleting Category"));
    }
};


const editCategory = async (req, res, next) => {
    const { id } = req.params

    try {
        const response = await Category.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).json({ success: true, response: response })
    } catch (error) {
        res.status(500).json({ error: 'Error updating document' });
    }
}


const getSingleCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            next(new ErrorHandler(400, "Category not found"));
        }

        return res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
    editCategory,
    getSingleCategory
}