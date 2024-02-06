const mongoose = require("mongoose");

const coupenSchema = new mongoose.Schema({
    coupenCode: {
        type: String,
        required: true,
    },
    coupenImages: [
        {
            type: String,
        },
    ]
});

const Coupen = mongoose.model("Coupen", coupenSchema);

module.exports = Coupen;
