const mongoose = require('mongoose');


let classSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	deptId: {
		type: String,
		required: true,
		trim: true
	}
});

let classModel = mongoose.model('class', classSchema);

module.exports = classModel;