const utils = require('../../helper/utils'),
    studentsModel = require('./studentModel.js'),
    mongoose = require('mongoose');

let studentService = {};

studentService.loginStudentDetails = function (queryData) {
    return new Promise(function (resolve, reject) {
        studentsModel.findOne(queryData).exec((error, studentDetails) => {
            if (!utils.empty(error)) {
                reject();
            } else{
                resolve(studentDetails);
            }
        });
    })
}

studentService.saveStudentDetails = function (input) {
    return new Promise(function (resolve, reject) {
        let student = new studentsModel(input);
        student.save((err) => {
            utils.log(err);
            if (utils.isDefined(err)) {
                utils.log(err);
                reject();
            } else {
                resolve();
            }
        });
    });
}
studentService.getStudentDetails = function (query) {
    return new Promise(function (resolve, reject) {
        studentsModel.findOne(query, (err, result) => {
            if (utils.isDefined(err)) {
                reject();
            } else {
                resolve(result)
            }
        })
    });
}
studentService.deleteStudentDetails = function (query) {
    return new Promise(function (resolve, reject) {
        studentsModel.remove(query, (err, result) => {
            if (utils.isDefined(err)) {
                reject();
            } else {
                resolve(result)
            }
        })
    });
}

studentService.updateStudentDetails = function (input) {
    return new Promise(function (resolve, reject) {
        let query = {
            _id: mongoose.Types.ObjectId(input.id)
        },
            newValues = {
                name: input.name,
                password: input.password,
                class_id: input.class_id
            };
        studentsModel.updateMany(query, newValues, (err, studentModification) => {
            if (utils.isDefined(err)) {
                reject();
            } else {
                resolve(studentModification)
            }
        })
    });
}
module.exports = studentService;