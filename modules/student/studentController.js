const moment = require('moment');

const jwt = require('../../helper/jwt'),
    utils = require('../../helper/utils'),
    studentsUtil = require('./helper'),
    studentServie = require('./student.service'),
    mongoose = require('mongoose'),
    classService = require('../class/class.service'),
    activityLogUtil = require('../studentActivityLogs/activitylogHelper'),
    deptService = require('../department/dept.service'),
    studentActivityLogs = require('../studentActivityLogs/activityLogs.service');
const activitylogsService = require('../studentActivityLogs/activityLogs.service');
const studentService = require('./student.service');
let studentsCtr = {};



studentsCtr.checkStatus =(req, res) => {

    let input = req.body;
    let dateArray = input.date.split('/');
    let query = {
        studentId: input.id,
        type : "checkin",
        timestamp: {
            '$gte': new Date(dateArray[0], dateArray[1]-1,dateArray[2]), 
            '$lt':  new Date(dateArray[0] , dateArray[1]-1 , dateArray[2]+1)
          }
    }
    activitylogsService
        .getActivitylogsDetails(query)
        .then(function(activitylogData){
            if(utils.isEmptyArray(activitylogData)){
                res.status(200).json({ message: "student was not present", status_code: 200 });
            }else
            {
                res.status(200).json({ message: "student was present", status_code: 200 });
            }
        },function(){
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
}

studentsCtr.logout = (req, res) => {
    let input = req.body;
    let activitylog = activityLogUtil.mapActivityDetails(input.id, 'logout', input.lat, input.long);
    studentActivityLogs.saveActivitylogsDetails(activitylog);
    return res.status(200).json({ message: req.t("LOGOUT_SUCCESSFUL"), status_code: 200 });
   
}
studentsCtr.checkIn = (req, res) => {
    let input = req.body;
    console.log(req.body)
    let query;
    if (mongoose.Types.ObjectId.isValid(input.id)) {
        query = {
            _id: mongoose.Types.ObjectId(input.id)
        };
    } else {
        return res.status(401).json({ message: req.t("NOT_VALID", { FIELD: 'student id' }), status_code: 401 });
    }
    studentService
    .getStudentDetails(query)
    .then(classService.getClassDetailsByStudent)
    .then(deptService.getDeptDetailsByClass)
    .then(function (studentDetails) {
        let long = req.body.long,
            lat = req.body.lat;
            if (studentsUtil.isWithinTime(studentDetails.deptData.startTime , studentDetails.deptData.endTime)) {
                return res.status(401).json({ "message": req.t("NOT_IN_TIME_RANGE"), status_code: 401 });
            }
            if (!studentsUtil.isWithinRange(studentDetails.deptData.range, lat, long)) {
                return res.status(401).json({ "message": req.t("NOT_WITHIN_AREA"), status_code: 401 });
            }
            let activitylog = activityLogUtil.mapActivityDetails(studentDetails._id, 'checkin', lat, long);
            studentActivityLogs.saveActivitylogsDetails(activitylog);
            
            return res.status(200).json({ message: req.t("CHECKIN_SUCCESSFUL"), status_code: 200 });

    }, function () {
        res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
    })
}
studentsCtr.loginstudent = (req, res) => {
    let input = req.body,
        filter = { "name": { "$regex": input.name.trim(), "$options": "i" }, "password": input.password };
    studentServie
        .loginStudentDetails(filter)
        .then(classService.getClassDetailsByStudent)
        .then(deptService.getDeptDetailsByClass)
        .then((studentDetails) => {

            
            let long = req.body.long,
                lat = req.body.lat;
            if (studentsUtil.isWithinTime()) {
                return res.status(401).json({ "message": req.t("NOT_IN_TIME_RANGE"), status_code: 401 });
            }
            if (!studentsUtil.isWithinRange(studentDetails.deptData.range, lat, long)) {
                return res.status(401).json({ "message": req.t("NOT_WITHIN_AREA"), status_code: 401 });
            }
            let activitylog = activityLogUtil.mapActivityDetails(studentDetails._id, 'login', lat, long);
            studentActivityLogs.saveActivitylogsDetails(activitylog);

            
            if (!utils.empty(studentDetails)) {
                let response = _.extend(studentDetails, {
                    secretToken: jwt.createSecretToken({ uid: studentDetails._id, role: studentDetails.name })
                });
                response = studentsUtil.studentDetail(response);
                res.status(200).json({ data: response, message: req.t("LOGIN_SUCCESSFUL"), status_code: 200 });
            } else {
                res.status(200).json({ message: req.t("USER_NOT_FOUND"), status_code: 200 });
            }
        }, () => {
            res.status(500).json({ "message": req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};

studentsCtr.saveStudentDetails = (req, res) => {
    let input = req.body;

    studentServie
        .saveStudentDetails(input)
        .then(function () {
            res.status(200).json({ message: req.t("INSERTED", { FIELD: "New student" }), status_code: 200 });
        }, function () {
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};

studentsCtr.updatestudent = (req, res) => {

    let input = req.body;
    studentServie
        .updateStudentDetails(input)
        .then(function (studentModification) {
            if (studentModification.nModified == 0) {
                res.status(200).json({ message: req.t("NO_UPDATE"), status_code: 200 });
            } else {
                res.status(200).json({ message: req.t("UPDATED", { FIELD: 'student' }), status_code: 200 });
            }
        }, function () {
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};



studentsCtr.getStudent = (req, res) => {
    let input = req.query;
    let query;
    if (mongoose.Types.ObjectId.isValid(input.id)) {
        query = {
            _id: mongoose.Types.ObjectId(input.id)
        };
    } else {
        return res.status(401).json({ message: req.t("NOT_VALID", { FIELD: 'student id' }), status_code: 401 });
    }
    studentService
        .getStudentDetails(query)
        .then(function (result) {

            if (utils.empty(result)) {
                res.status(200).json({ message: req.t("NO_RECORD_FOUND"), status_code: 200 });
            } else {
                let response = studentsUtil.studentDetail(result);
                res.status(200).json({ data: response, message: req.t("DATA_FOUND"), status_code: 200 });
            }
        }, function () {
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};
studentsCtr.deleteStudent = (req, res) => {
    let input = req.query;
    let query;
    if (mongoose.Types.ObjectId.isValid(input.id)) {
        query = {
            _id: mongoose.Types.ObjectId(input.id)
        };
    } else {
        return res.status(401).json({ message: req.t("NOT_VALID", { FIELD: 'student id' }), status_code: 401 });
    }
    studentService
        .deleteStudentDetails(query)
        .then(function (result) {
            if (result.deletedCount == 0) {
                res.status(200).json({ message: req.t("NO_RECORD_FOUND"), status_code: 200 });
            } else {
                res.status(200).json({ message: req.t("DELETED", { FIELD: 'student' }), status_code: 200 });
            }
        }, function () {
            res.status(500).json({ message: req.t("PLEASE_TRY_AGAIN"), status_code: 500 });
        })
};
module.exports = studentsCtr;