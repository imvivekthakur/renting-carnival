const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryImages: [
    {
      type: String,
    },
  ]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
