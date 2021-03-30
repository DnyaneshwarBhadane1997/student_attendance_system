const utils = require('../../helper/utils'),
    activitylogsModel = require('./activityLogsModel'),
    mongoose = require('mongoose');

const activitylogsService  ={}

activitylogsService.getActivitylogsDetails =  (query) => {
    return new Promise(function (resolve, reject) {

        activitylogsModel.find(query, (err , data) => {
            
            if (utils.isDefined(err)) {
                utils.log(err);
                reject();
            } else {
                resolve(data);
            }
        });
    });
}


activitylogsService.saveActivitylogsDetails =  (logsData) => {
    return new Promise(function (resolve, reject) {
        let activitylogsObj = new activitylogsModel(logsData);
        activitylogsObj.save((err , data) => {
            if (utils.isDefined(err)) {
                utils.log(err);
                reject();
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = activitylogsService;