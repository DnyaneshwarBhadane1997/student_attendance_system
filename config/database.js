const mongoose = require('mongoose'),
	utils = require('../helper/utils'),
	conf = { useNewUrlParser: true };

if (!utils.empty(process.env.DBUSER)) {

	mongoose.connect('mongodb://' + process.env.DBUSER + ':' + process.env.DBPASSWORD + '@' + process.env.DBHOST + '/' + process.env.DATABASE);
} else {
	mongoose.connect('mongodb://' + process.env.DBHOST + ':27017/' + process.env.DATABASE, conf);
}

mongoose.connection.on('error', function (err) {
	
	console.log(err);
	console.log("Could not connect server....");
});