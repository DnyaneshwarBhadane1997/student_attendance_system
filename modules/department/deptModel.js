const mongoose = require('mongoose');


let deptSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	instId: {
		type: String,
		required: true,
		trim: true
	},
	range: {
		type: Object,
		required: true
	},
	startTime: {
		type: String,
		required: true,
		trim: true
	},
	endTime: {
		type: String,
		required: true,
		trim: true
	}
});

let deptModel = mongoose.model('department', deptSchema);

module.exports = deptModel;


