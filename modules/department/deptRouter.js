
const Router = require('router')();
const auth =  require('../../helper/auth');
const deptCtr = require('./deptController');
const deptMiddleware =  require('./deptMiddleware');

Router.post('/',deptMiddleware.validateInput('create') , deptCtr.createDept);

// Router.get('/',deptsCtr.getDeptDetails);
// Router.put('/' );
// Router.delete('/');


module.exports = Router;