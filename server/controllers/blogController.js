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
  } = req.body;

  console.log("reqboyd", req.body)

  //     console.log(req.user);
  owner = req.user._id;

  let files = req.files ? req.files.blogImages : null;
  console.log("files ", files);
  let blogImages = [];

  if (files) {
    for (const file of files) {
      try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          public_id: `${Date.now()}`,
          resource_type: "auto",
          folder: "images",
        });

      } catch (error) {
        console.log("error : ", error)
      }

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
  });

  console.log("blog", blog)

  // response
  return res
    .status(200)
    .json({ success: true, message: "Blog Created successfully.", blog });
};


module.exports = {
  insertNewBlog
};
