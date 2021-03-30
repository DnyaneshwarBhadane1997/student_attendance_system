const utils = require('./utils'),
    jwt = require('./jwt'),
    usersModel = require('../modules/student/studentModel');

let auth = {};

auth.isAuthenticatedUser = (req, res, next) => {

    
    let userData = jwt.decodeToken((req.headers && req.headers['x-auth-token']));
    
    if (utils.empty(userData.uid)) {
        return res.status(401).send({ message: req.t("NOT_AUTHORIZED"), status_code: 401 });
    } else {

        usersModel.findOne({ _id: userData.uid }).exec((error, userData) => {
            if (error) {
                return res.status(500).send({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
            } else if (userData) {
                next();
            } else {

                return res.status(401).send({ message: req.t("NOT_AUTHORIZED"), status_code: 401 });
            }
        })
    }
}


module.exports = auth;