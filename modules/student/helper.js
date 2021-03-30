let pointInpolygon = require('point-in-polygon');

let studentUtil = {};

studentUtil.isWithinTime =(startTime,endTime) =>{
    let currentHour = (new Date()).getHours();
    return startTime <= currentHour && endTime >= currentHour ? true : false;
}
studentUtil.isWithinRange =(polygon ,lat, long) =>{
    return pointInpolygon([lat, long] , polygon)
}
studentUtil.studentDetail = (data) => {

    let student = {},
        selectData = [
            "name",
            "secretToken",
            "class_id",
        ];

    _(selectData).forEach(function (val) {
        student[val] = data[val];
    });
    
    return student;
};



module.exports = studentUtil