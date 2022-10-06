const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController")

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

router.get("/:id/details", (request, response) => {
    UserController.getUserDetails(request.params)
        .then((result) => {
            response.send(result)
        })
})

module.exports = router;