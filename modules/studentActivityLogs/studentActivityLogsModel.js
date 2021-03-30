const mongoose = require('mongoose');


let studentActivityLogSchema = new mongoose.Schema({
	timestamp: {
		type: Date,
		required: true,
		trim: true
	},
    studentId: {
		type: String,
		required: true,
		trim: true
	},
	lat: {
		type: String,
		required: true,
		trim: true
	},
	long: {
		type: String,
		required: true,
		trim: true
	},
	type: {
		type: String,
		required: true,
		trim: true
	}
});

let studentActivityLogsModel = mongoose.model('studentActivityLog', studentActivityLogSchema);

module.exports = studentActivityLogsModel;