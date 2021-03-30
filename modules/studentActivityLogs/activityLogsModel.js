const mongoose = require('mongoose');


let activityLogsSchema = new mongoose.Schema({
	studentId: {
		type: String,
		required: true,
		trim: true
	},
	type:{
		type: String,
		enum : ['login', 'logout' , 'checkin'],
		required: true,
		trim: true
	},
	longitude: {
		type: String,
		required: true,
		trim: true
	},
	latitude :{
		type: String,
		required: true,
		trim: true
	},
	timestamp :{
		type: Date,
		required: true,
		trim: true
	}

});

let activityLogsModel = mongoose.model('studentActivityLogs', activityLogsSchema);

module.exports = activityLogsModel;