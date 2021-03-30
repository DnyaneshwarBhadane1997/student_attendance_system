const utils = require('../../helper/utils'),
    classModel = require('./classModel.js'),
    mongoose = require('mongoose'),
    classHelper =require('./classHelper');
    

const classService  ={}

classService.getClassDetailsByStudent = (stduentObject) => {
    return new Promise(function (resolve, reject) {
        console.log("stduentObject" , stduentObject);
        if(!mongoose.Types.ObjectId.isValid(stduentObject.class_id)){
            return reject();
        }
        // console.log("stduentObject" , stduentObject);
        let query = {
            _id: mongoose.Types.ObjectId(stduentObject.class_id)
        };
        classModel.findOne(query, (err, result) => {
            if (utils.isDefined(err)) {
                reject();
            } else {
                if(result && result._doc){
                    _.extend(stduentObject, {
                      classData:  classHelper.classDetail(result._doc)
                  });
                  return resolve(stduentObject);
                }else{
                    return reject();
                }
                
                
            }
        })
    });
}

classService.saveClassDetails =  (input) => {
    return new Promise(function (resolve, reject) {
        let classObj = new classModel(input);
        classObj.save((err) => {
            if (utils.isDefined(err)) {
                utils.log(err);
                reject();
            } else {
                resolve();
            }
        });
    });
}

module.exports = classService;