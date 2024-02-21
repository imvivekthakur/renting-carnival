const mongoose = require("mongoose");

const coupenSchema = new mongoose.Schema({
    coupenCode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        default : 0,
    },
    coupenImages: [
        {
            type: String,
        },
    ]
});

const Coupen = mongoose.model("Coupen", coupenSchema);

module.exports = Coupen;
