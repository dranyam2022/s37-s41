const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")
const auth = require("../auth");
const { response } = require("express");

//Check if Email Exist
router.post("/check-email", (request, response) => {
    UserController.checkIfEmailExists(request.body)
        .then((result) => {
            response.send(result)
        })
})

//Register new User
router.post("/register", (request, response) => {
    UserController.register(request.body)
        .then((result) => {
            response.send(result)
        })
})

//Login User
router.post("/login", (request, response) => {
    UserController.login(request.body)
        .then((result) => {
            response.send(result)
        })
})

router.get("/:id/details", auth.verify, (request, response) => {

    UserController.getUserDetails(request.params)
        .then((result) => {
            response.send(result)
        })
})

//Enroll a User
router.post("/enroll", auth.verify, (request, response) => {
    let data = {
        userId: request.body.userId,
        courseId: request.body.courseId
    }
    UserController.enroll(data)
        .then((result) => {
            response.send(result)
        })
})

//appoint user as admin
router.patch("/:id/makeAdmin", auth.verify, (request, response) => {
    UserController.makeAdmin(request.params.id)
        .then((result) => {
            response.send(result)
        })
})




module.exports = router;