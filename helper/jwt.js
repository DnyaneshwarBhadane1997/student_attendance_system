const jwt = require('jwt-simple');

let jwtUtil = {};


jwtUtil.createSecretToken = (data) => {

    let token = jwt.encode(data, process.env.SECRET);
    return token;
}

jwtUtil.decodeToken = (token) => {

    let data = {};

    if (token) {

        try {

            let decoded = jwt.decode(token, process.env.SECRET);
            data = decoded;
        } catch (err) {

            return data;
        }
    }

    return data;
}

jwtUtil.getCurrentUserId = (req) => {

    let token = (req.headers && req.headers['auth-token']),
        userID = "";

    if (token) {

        try {

            let decoded = jwt.decode(token, process.env.SECRET);
            userID = decoded.uid;
        } catch (err) {

            userID
        }
    }
    
    return userID;
}

module.exports = jwtUtil