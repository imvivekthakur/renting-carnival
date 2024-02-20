const mongoose = require("mongoose");

const packageCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            }
        },
    ],
});

module.exports = mongoose.model("PackageCart", packageCartSchema);
