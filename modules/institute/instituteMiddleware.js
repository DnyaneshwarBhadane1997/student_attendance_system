const institutesValidator = require('../fieldValidator'),
apivalidator = require('../../helper/validate'),
institutesModel = require('./instituteModel'),
utils = require('../../helper/utils'),
mongoose = require('mongoose');

let instituteMiddleware = {};

instituteMiddleware.validateInput = (type, validateType) => {

return (req, res, next) => {
    let validators = institutesValidator.getInstituteValidator(req, type),
        error = apivalidator.validate(req.body, validators);
    if (utils.empty(error)) {
        next();
    } else {
        return res.status(400).json({ "message": error, status_code: 400 });
    }
    };
};
module.exports =instituteMiddleware;