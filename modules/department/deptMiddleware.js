const deptsValidator = require('../fieldValidator'),
apivalidator = require('../../helper/validate'),
utils = require('../../helper/utils');

let deptMiddleware = {};

deptMiddleware.validateInput = (type, validateType) => {

return (req, res, next) => {

    let validators = deptsValidator.getDeptValidator(req, type),
        error = apivalidator.validate(req.body, validators);

    if (utils.empty(error)) {
        next();
    } else {
        return res.status(400).json({ "message": error, status_code: 400 });

    }
    };
};
module.exports =deptMiddleware;