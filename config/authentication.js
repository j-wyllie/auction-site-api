let isLogedIn = false;

exports.isAuthorised = function(req, res, next) {
    if (isValidToken(req.get('X-Authorization'))) {
        next(); // if we have a valid token, we can proceed
    } else {
        res.sendStatus(401); // otherwise respond with 401 unauthorized
    }
};

function isValidToken(givenToken) {
    if (givenToken.toString() === token) {
        return true;
    } else {
        return false;
    }
};