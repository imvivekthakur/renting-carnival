const { ErrorHandler } = require("../middleware/errorHandler");
const ContactUs = require("../models/contactModel");

const contactUs = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return new ErrorHandler(400, "All Fields are required");
    }

    const contactMessage = new ContactUs({ name, email, message });
    const savedContact = await contactMessage.save();
    res.status(200).json({
      success: true,
      msg: "Message sent",
      contactMessage,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllContact = async (req, res, next) => {
  try {
    const allContact = await ContactUs.find()
    console.log("allContact", allContact)
    res.status(200).json({
      success:true,
      allContact
    })
  } catch (error) {
    console.log(error);
    next(error);

  }
}

const deleteContact = async (req, res, next) => {
  try {
      const contactId = req.params.contactId;
      console.log(contactId);
      // Check if the coupen exists
      const coupen = await ContactUs.findById(contactId);
      if (!coupen) {
          throw new ErrorHandler(404, "Coupen not found.");
      }

      console.log(coupen);
      // Delete the coupen
      await ContactUs.findByIdAndDelete(contactId);

      res.status(200).json({
          success: true,
          msg: "Contact deleted successfully",
      });
  } catch (error) {
      console.log(error);
      res.status(500).json(new ErrorHandler(500, "Error while deleting contact"));
  }
};

module.exports = {
  contactUs,
  getAllContact,
  deleteContact
};
