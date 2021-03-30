const mongoose = require('mongoose'),
  studentActivityLogModel = require('../modules/studentActivityLogs/activityLogsModel'),
  stundetModel = require('../modules/student/studentModel'),
  classModel = require('../modules/class/classModel'),
  deptModel = require('../modules/department/deptModel'),
  instituteModel = require('../modules/institute/instituteModel');
const studentDataJSON = require('./students.json'),
  classDataJSON = require('./classes.json'),
  deptDataJSON = require('./departments.json'),
  instituteDataJSON = require('./institutes.json');


function resetDB() {
  studentActivityLogModel.deleteMany({}, function () {

    instituteModel.deleteMany({}, function () {

      deptModel.deleteMany({}, function () {

        classModel.deleteMany({}, function () {

          stundetModel.deleteMany({}, () => {

            insertDB();
          });
        });
      });
    });
  });
}

function insertDB() {

  instituteDataJSON.forEach(function (input) {
    input._id = mongoose.Types.ObjectId(input._id);
    let instituteModelObj = new instituteModel(input);
    instituteModelObj.save();
  })
  deptDataJSON.forEach(function (input) {
    input._id = mongoose.Types.ObjectId(input._id);
    let deptModelObj = new deptModel(input);
    deptModelObj.save();
  })
  classDataJSON.forEach(function (input) {
    input._id = mongoose.Types.ObjectId(input._id);
    let classModelObj = new classModel(input);
    classModelObj.save();
  })
  studentDataJSON.forEach(function (input) {
    input._id = mongoose.Types.ObjectId(input._id);
    let stundetModelObj = new stundetModel(input);
    stundetModelObj.save();
  })

}
function Init() {
  resetDB();
  //  insertDB();

}


Init();


