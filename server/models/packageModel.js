const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  packageImage: [
    {
      type: String,
    },
  ],
  limitProduct: {
    type: Number,
    required: true,
  },
  totalProductsCost: {
    type: Number,
    required: true,
  },
  packagePrice: [
    {
      type: Number,
      default: 0
    },
  ],
});

module.exports = mongoose.model("Package", packageSchema);
