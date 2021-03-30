const classsValidator = require('./../fieldValidator'),
apivalidator = require('../../helper/validate'),
classsModel = require('./classModel'),
utils = require('../../helper/utils'),
mongoose = require('mongoose');

let classMiddleware = {};

classMiddleware.validateInput = (type, validateType) => {

return (req, res, next) => {

    console.log("Helllo..............")
    let validators = classsValidator.getClassValidator(req, type),
        error = apivalidator.validate(req.body, validators);

    if (utils.empty(error)) {
        next();
    } else {
        return res.status(400).json({ "message": error, status_code: 400 });
        
    }
    };
};
module.exports =classMiddleware;