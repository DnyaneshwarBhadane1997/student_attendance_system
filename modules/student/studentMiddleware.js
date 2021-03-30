const studentsValidator = require('./../fieldValidator'),
    apivalidator = require('../../helper/validate'),
    studentsModel = require('./studentModel'),
    utils = require('../../helper/utils'),
    mongoose = require('mongoose');

let studentMiddleware = {};

studentMiddleware.validateInput = (type, validateType) => {

    return (req, res, next) => {

        
        let validators = studentsValidator.getStudentValidator(req, type),
        
            error = apivalidator.validate(req.body, validators);

        if (!utils.empty(error)) {

            return res.status(400).json({ "message": error, status_code: 400 });
        } else {

            next();
        }
    };
};
studentMiddleware.validateCheckingInput = (type, validateType) => {

    return (req, res, next) => {

        
        let validators = studentsValidator.getCheckingValidator(req, type),
        
            error = apivalidator.validate(req.body, validators);

        if (!utils.empty(error)) {

            return res.status(400).json({ "message": error, status_code: 400 });
        } else {

            next();
        }
    };
};
studentMiddleware.isValidStudent = (req, res, next) => {

    let input = req.body,
        query =
            { name: { $regex: new RegExp("^" + input.name.trim() + "$", "i") } };

    if (!utils.empty(input.id))
        query._id = { $ne: mongoose.Types.ObjectId(input.id) };


    studentsModel.findOne(query).exec((error, studentDetails) => {
        
        if (error) {
            
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });

        } else if (!utils.empty(studentDetails)) {

            res.status(400).json({ message: req.t("EXIST", { FIELD: 'Please check the StudentName' }), status_code: 400 });

        } else {
            
            next();
        }
    })
};

module.exports = studentMiddleware;