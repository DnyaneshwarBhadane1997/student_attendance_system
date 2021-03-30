const utils = require('../../helper/utils'),
    deptModel = require('./deptModel.js'),
    mongoose = require('mongoose');

const deptService  ={}

deptService.getDeptDetailsByClass =  (stduentObject) => {

    return new Promise(function (resolve, reject) {
        if(!mongoose.Types.ObjectId.isValid(stduentObject.classData.deptId)){
            return reject();
        }
        let query = {
            _id: mongoose.Types.ObjectId(stduentObject.classData.deptId)
        };
        deptModel.findOne(query, (err, result) => {
            
            if (utils.isDefined(err)) {
                reject();
            } else {
                  _.extend(stduentObject, {
                    deptData :  result._doc
                });
                return resolve(stduentObject);
            }
        })
    
    })
    
}

deptService.saveDeptDetails =  (input) => {
    return new Promise(function (resolve, reject) {
        let deptObj = new deptModel(input);
        deptObj.save((err) => {
            if (utils.isDefined(err)) {
                utils.log(err);
                reject();
            } else {
                resolve();
            }
        });
    });
}

module.exports = deptService;