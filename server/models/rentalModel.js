const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    pickUpLocation: {
        type: String,
        required: true,
    },
    dropOffLocation: {
        type: String,
        required: true,
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    dropOffDate: {
        type: Date,
        required: true
    },
    pickUpTime: {
        type: String,
        required: true
    },
    dropOffTime: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
