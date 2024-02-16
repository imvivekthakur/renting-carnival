const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription : {
        type : String,
        required : true
    },
    description: {
        type: String,
        required: true,
    },
    blogImages: [
        {
            type: String,
        },
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },

});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
