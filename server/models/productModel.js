const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // productImage: {
  //   type: String,
  //   default: null,
  // },

  productImages: [
    {
      type: String,
    },
  ],
  productImagesDesc: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
  rent:[
    {
      type : Number,
      default : 0
    },
  ],
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  stealDeal: {
    type: String,
    default : "No"
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
