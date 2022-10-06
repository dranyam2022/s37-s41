const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const auth = require("../auth")

module.exports.checkIfEmailExists = (data) => {
    return User.find({ email: data.email })
        .then((result) => {
            if (result.length > 0) {
                return true
            }
            return false
        })
}

module.exports.register = (data) => {

    const encryptedPassword = bcrypt.hashSync(data.password, 10);

    let newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNo: data.mobileNo,
        password: encryptedPassword
    })

    return newUser.save()
        .then((createdUser, error) => {
            if (error) {
                return error
            }
            return {
                message: "User successfully registered"
            }
        })
}

module.exports.login = (data) => {
    return User.findOne({ email: data.email })
        .then((result) => {
            if (result === null) {
                return {
                    message: "User doesn't exist!"
                }
            }
            const isPasswordCorrect = bcrypt.compareSync(data.password, result.password)
            if (isPasswordCorrect) {
                return {
                    access: auth.createAccessToken(result)
                }
            }
            return {
                message: "Password is incorrect!"
            }
        })
}

module.exports.getUserDetails = (data) => {

    return User.findOne({ _id: data.id }, { password: 0 })
        .then((result, error) => {
            if (error) {
                return error
            }
            return result
        })
}