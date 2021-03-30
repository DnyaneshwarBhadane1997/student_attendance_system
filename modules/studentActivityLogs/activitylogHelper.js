let activityLogUtil = {};


activityLogUtil.mapActivityDetails = (studentId ,type ,lat ,long) =>{
    let activityLog ={
        studentId:studentId,
        type :type,
        latitude : lat,
        longitude : long,
        timestamp : new Date()
    }
    return activityLog;
}   

module.exports = activityLogUtil;