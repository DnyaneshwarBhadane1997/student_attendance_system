const mongoose = require('mongoose');


let instituteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	address: {
		type: String,
		required: true,
		trim: true
	}
});

let instituteModel = mongoose.model('institute', instituteSchema);

module.exports = instituteModel;