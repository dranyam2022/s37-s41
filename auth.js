const jwt = require("jsonwebtoken");
const secret = "CourseBookingAPI";

//for creating a token out of users details and secret key

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    return jwt.sign(data, secret, {})
}


//verify if the token form the user is valid based on the secret key
module.exports.verify = (request, response, next) => {
    let token = request.headers.authorization;

    //if token is received and not undefined
    if (typeof token !== "undefined") {
        console.log(token)

        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (error, data) => {
            if (error) {
                return response.send({
                    auth: "Failed"
                })
            }
            else {
                next()
            }
        })

    }
    //if token does not exist
    else {
        return response.send({
            auth: "Failed"
        })
    }
}

//for extracting the user data from the token
module.exports.decode = (token) => {

    // Token recieved and is not undefined
    if (typeof token !== "undefined") {

        // Retrieves only the token and removes the "Bearer " prefix
        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (error, data) => {

            if (error) {

                return null;

            } else {

                // The "decode" method is used to obtain the information from the JWT
                // The "{complete:true}" option allows us to return additional information from the JWT token
                // Returns an object with access to the "payload" property which contains user information stored when the token was generated
                // The payload contains information provided in the "createAccessToken" method defined above (e.g. id, email and isAdmin)
                return jwt.decode(token, { complete: true }).payload;
            };

        })

        // Token does not exist
    } else {

        return null;

    };

};