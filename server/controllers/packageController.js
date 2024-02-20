const { ErrorHandler } = require("../middleware/errorHandler.js");
const Package = require("../models/packageModel");
const User = require("../models/userModel.js");
const cloudinary = require("cloudinary").v2;


const createPackage = async (req, res, next) => {
  try {
    const { packageName, packagePrice, totalProductsCost, limitProduct } = req.body

    owner = req.user._id;


    if (req.user.role === "buyer") {
      next(new ErrorHandler(400, "Buyer cannot create a product"));
    }

    if (!packageName) {
      next(new ErrorHandler(400, "packageName is required"));
    } else if (!packagePrice) {
      next(new ErrorHandler(400, "packagePrice is required"));
    } else if (!totalProductsCost) {
      next(new ErrorHandler(400, "totalProductsCost is required"));
    } else if (!limitProduct) {
      next(new ErrorHandler(400, "limitProduct is required"));
    }

    let files = req.files ? req.files?.packageImage : null;
    console.log("packageImage ", files);

    let packageImage = [];

    if (files) {
      const result = await cloudinary.uploader.upload(files.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "images",
      });

      console.log("result ", result);

      if (result && result.secure_url) {
        packageImage.push(result.secure_url);
      } else {
        return res
          .status(500)
          .json({ message: "Failed to upload one or more images" });
      }
    }


    const package = await Package.create({
      packageName, packagePrice, totalProductsCost, limitProduct, packageImage
    });

    console.log("package ", package);

    return res.status(201).json({
      success: true,
      msg: `package added successfully`,
      package,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

const getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    return res.status(200).json({
      success: true,
      msg: "All packages retrieved Successfully",
      packages,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getSinglePackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    console.log("package id ", packageId);
    // Find the package by ID in the database
    const package = await Package.findById(packageId);

    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ package, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updatePackage = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    if (!user) {
      next(new ErrorHandler(400, "User not exists"));
    }

    const { packageId } = req.body;

    const package = await Package.findById(packageId);
    if (!package) {
      next(new ErrorHandler(400, "package not exists"));
    }

    user.boughtPackages.push(package.packageId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Package updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const editPackage = async (req, res, next) => {
  const { id } = req.params

  try {
    const response = await Package.findByIdAndUpdate(id, req.body, { new: true })

    return res.status(200).json({ success: true, response: response })
  } catch (error) {
    res.status(500).json({ error: 'Error updating document' });
  }
}


const deletePackage = async (req, res, next) => {
  try {
    const packageId = req.params.packageId;
    console.log(packageId);
    // Check if the package exists
    const package = await Package.findById(packageId);
    if (!package) {
      throw new ErrorHandler(404, "Package not found.");
    }

    console.log(package);
    // Delete the package
    await Package.findByIdAndDelete(packageId);

    res.status(200).json({
      success: true,
      msg: "Package deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorHandler(500, "Error while deleting package"));
  }
};


module.exports = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  editPackage,
  deletePackage,
};
