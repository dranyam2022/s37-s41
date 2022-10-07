const Course = require("../models/Course");


module.exports.addCourse = (data) => {
    if (data.isAdmin) {
        let newCourse = new Course({
            name: data.course.name,
            description: data.course.description,
            price: data.course.price
        }
        )

        return newCourse.save()
            .then((newCourse, error) => {
                if (error) {
                    return false
                }
                return {
                    message: "New course successfully created."
                }
            })
    }
    let message = Promise.resolve({ messsage: "User must be ADMIN to access this." })

    return message.then((value) => {
        return value
    })
}

//Get all courses
module.exports.getAllCourses = () => {
    return Course.find({})
        .then((result) => {
            return result
        })
}

module.exports.getAllActive = () => {
    return Course.find({ isActive: true })
        .then((result) => {
            return result
        })
}

module.exports.getCourse = (courseId) => {
    return Course.findById(courseId)
        .then((result) => {
            return result
        })
}

module.exports.updateCourse = (courseId, newData) => {
    return Course.findByIdAndUpdate(courseId, {
        name: newData.name,
        description: newData.description,
        price: newData.price
    })
        .then((udpatedCourse, error) => {
            if (error) {
                return false
            }
            return {
                message: "Course has been updated successfully!"
            }
        })
}

module.exports.archiveCourse = (courseId) => {
    return Course.findByIdAndUpdate(courseId, {
        isActive: false
    })
        .then((udpatedCourse, error) => {
            if (error) {
                return false
            }
            return {
                message: "Course isActive status has been updated successfully to false!"
            }
        })
}