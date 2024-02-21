const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomImages: [
        {
            type: String,
        },
    ],
    heading: {
        type: String,
        required: true
    }
})

const Rooms = mongoose.model("Rooms", roomSchema)

module.exports = Rooms;