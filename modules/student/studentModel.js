const utils = require('../../helper/utils'),
	mongoose = require('mongoose');

let encryptProperty = (value) => {
	return !utils.empty(value) ? utils.encrypt(value) : "";
};

let studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		set: encryptProperty,
	},
	class_id: {
		type: String,
		required: true,
		trim: true
	}
});

let studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;