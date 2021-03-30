
const Router = require('router')();
const auth =  require('../../helper/auth');
const studentCtr = require('./studentController');
const studentMiddleware =  require('./studentMiddleware');


Router.post('/login' , studentMiddleware.validateInput("login")  , studentCtr.loginstudent );

let createMiddleware = [studentMiddleware.validateInput("create"),studentMiddleware.isValidStudent, studentCtr.saveStudentDetails];
Router.post('/', createMiddleware);

let updateMiddleware = [auth.isAuthenticatedUser, studentMiddleware.validateInput("update"), studentCtr.updatestudent];
Router.put('/', updateMiddleware);

Router.delete('/', auth.isAuthenticatedUser, studentCtr.deleteStudent);

Router.get('/logout', auth.isAuthenticatedUser, studentCtr.getStudent);

Router.post('/logout', auth.isAuthenticatedUser,studentMiddleware.validateCheckingInput('checkin'), studentCtr.logout);

Router.post('/checkedin', auth.isAuthenticatedUser,studentMiddleware.validateCheckingInput('checkin'), studentCtr.checkIn);

Router.post('/status', auth.isAuthenticatedUser,studentMiddleware.validateCheckingInput('status'), studentCtr.checkStatus);

module.exports =  Router;