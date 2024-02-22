const { ErrorHandler } = require("../middleware/errorHandler");
const Rental = require("../models/rentalModel");
// const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const cloudinary = require("cloudinary").v2;

const createRental = async (req, res, next) => {
    try {
        const { pickUpLocation, dropOffLocation, pickUpDate, dropOffDate, pickUpTime, dropOffTime } = req.body;

        owner = req.user._id;

        if (req.user.role === "buyer") {
            next(new ErrorHandler(400, "Buyer cannot create a rental"));
        }

        if (!pickUpLocation) {
            next(new ErrorHandler(400, "pickUpLocation is required"));
        } else if (!pickUpDate) {
            next(new ErrorHandler(400, "pickUpDate is required"));
        } else if (!dropOffLocation) {
            next(new ErrorHandler(400, "dropOffLocation is required"));
        } else if (!dropOffDate) {
            next(new ErrorHandler(400, "dropOffDate is required"));
        } else if (!pickUpTime) {
            next(new ErrorHandler(400, "pickUpTime is required"));
        } else if (!dropOffTime) {
            next(new ErrorHandler(400, "dropOffTime is required"));
        }

        const rental = await Rental.create({
            pickUpLocation, dropOffLocation, pickUpDate, dropOffDate, pickUpTime, dropOffTime, owner
        });

        console.log("rental ", rental);

        return res.status(201).json({
            success: true,
            msg: `Rental added successfully`,
            rental,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAllRentals = async (req, res, next) => {
    try {
        const allRentals = await Rental.find({}).populate("owner", "name")
        res.status(200).json({
            success: true,
            msg: "All rentals retrieved successfully",
            allRentals,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteRental = async (req, res, next) => {
    try {
        const rentalId = req.params.id;
        console.log(rentalId);
        // Check if the rental exists
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            throw new ErrorHandler(404, "Rental not found");
        }

        console.log(rental);
        // Delete the rental
        await Rental.findByIdAndDelete(rentalId);

        res.status(200).json({
            success: true,
            msg: "Rental deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(new ErrorHandler(500, "Error while deleting rental"));
    }
};

module.exports = {
    createRental,
    getAllRentals,
    deleteRental
};
