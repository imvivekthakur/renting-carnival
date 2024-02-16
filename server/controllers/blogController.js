const Blog = require("../models/blogModel.js");
const cloudinary = require("cloudinary").v2;
const { ErrorHandler } = require("../middleware/errorHandler");

const insertNewBlog = async (req, res, next) => {
  console.log("just entered")

  // req.body
  const {
    title,
    date,
    description,
    shortDescription,
  } = req.body;

  console.log("reqboyd", req.body)

  //     console.log(req.user);
  owner = req.user._id;

  let files = req.files ? req.files.blogImages : null;
  console.log("files ", files);
  let blogImages = [];

  if (files) {
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "images",
      });

      console.log("result ", result);

      if (result && result.secure_url) {
        blogImages.push(result.secure_url);
      } else {
        return res
          .status(500)
          .json({ message: "Failed to upload one or more images" });
      }
    }
  }

  console.log("blog images ", blogImages);

  // save the data
  const blog = await Blog.create({
    blogImages: blogImages,
    title: title,
    date: date,
    description: description,
    shortDescription: shortDescription,
  });

  console.log("blog", blog)

  // response
  return res
    .status(200)
    .json({ success: true, message: "Blog Created successfully.", blog });
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      success: true,
      msg: "All Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  const { dbId } = req.query;
  console.log("dbId", dbId)
  try {
    const blogs = await Blog.findById({ _id: dbId });
    console.log("blogs", blogs)
    res.status(200).json({
      success: true,
      msg: "Single Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    // Check if the product exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ErrorHandler(404, "Product not found");
    }

    console.log(blog);
    // Delete the product
    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorHandler(500, "Error while deleting blog"));
  }
};


module.exports = {
  insertNewBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog
};
