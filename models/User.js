const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required."]
    },
    lasttName: {
        type: String,
        required: [true, "Last Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile number is required."]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    enrollemnts: [
        {
            cousreId: {
                type: String,
                required: [true, "Course ID is requried."]
            },
            enrolledOn: {
                type: Date,
                default: new Date()
            },
            status: {
                type: String,
                default: "enrolled"
            }
        }
    ]
})

module.exports = mongoose.model("Course", userSchema)