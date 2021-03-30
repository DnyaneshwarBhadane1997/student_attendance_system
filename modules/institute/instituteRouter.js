
const Router = require('router')();
const auth =  require('../../helper/auth');
const instituteCtr = require('./instituteController');
const instituteMiddleware =  require('./instituteMiddleware');

Router.post('/',instituteMiddleware.validateInput('create') , instituteCtr.createInstitute);

// Router.get('/',institutesCtr.getInstituteDetails);
// Router.put('/' );
// Router.delete('/');


module.exports = Router;