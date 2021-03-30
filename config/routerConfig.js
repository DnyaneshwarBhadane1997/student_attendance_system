const studentRouter =  require('../modules/student/router');
const classRouter =  require('../modules/class/classRouter');
const deptRouter =  require('../modules/department/deptRouter');
const instituteRouter =  require('../modules/institute/instituteRouter');


const configService = {
    config(app){
            app.use('/student/' , studentRouter);
            app.use('/department/' , deptRouter);
            app.use('/class/' , classRouter);
            app.use('/institute/' , instituteRouter);
    }
}

module.exports = configService;


