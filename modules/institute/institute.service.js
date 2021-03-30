const utils = require('../../helper/utils'),
    instituteModel = require('./instituteModel.js'),
    mongoose = require('mongoose');

const instituteService  ={}

instituteService.getInstituteDetails =  () => {
    
}
instituteService.saveInstituteDetails =  (input) => {
    return new Promise(function (resolve, reject) {
        let instituteObj = new instituteModel(input);
        instituteObj.save((err) => {
            if (utils.isDefined(err)) {
                utils.log(err);
                reject();
            } else {
                resolve();
            }
        });
    });
}

module.exports = instituteService;