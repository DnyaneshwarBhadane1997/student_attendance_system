
const Router = require('router')();
const auth =  require('../../helper/auth');
const classCtr = require('./classController');
const classMiddleware =  require('./classMiddleware');

Router.post('/',classMiddleware.validateInput('create') , classCtr.createClass);

// Router.get('/',classsCtr.getClassDetails);
// Router.put('/' );
// Router.delete('/');


module.exports = Router;