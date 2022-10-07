const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");
const auth = require("../auth");
const { response } = require("express");

//Create single course
router.post("/create", auth.verify, (request, response) => {
    const data = {
        course: request.body,
        isAdmin: auth.decode(request.headers.authorization).isAdmin
    }


    CourseController.addCourse(data)
        .then((result) => {
            response.send(result)
        })
})

router.get("/", (request, response) => {
    CourseController.getAllCourses()
        .then((result) => {
            response.send(result)
        })
})

//Get all Active courses
router.get("/active", (request, response) => {
    CourseController.getAllActive()
        .then((result) => {
            response.send(result)
        })
})

//Get Single Course
router.get("/:courseid", (request, response) => {

    CourseController.getCourse(request.params.courseid)
        .then((result) => {
            response.send(result)
        })
})

//Update Single Course
router.patch("/:courseid/update", auth.verify, (request, response) => {
    CourseController.updateCourse(request.params.courseid, request.body)
        .then((result) => {
            response.send(result)
        })
})

//Upddate a Single Course isActive to false
router.patch("/:courseid/archive", auth.verify, (request, response) => {
    CourseController.archiveCourse(request.params.courseid)
        .then((result) => {
            response.send(result)
        })
})




module.exports = router;