const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    testimonialImages: [
        {
            type: String,
        },
    ],
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
