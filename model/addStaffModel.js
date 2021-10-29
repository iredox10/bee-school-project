const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	surName: {
		type: String,
		required: true,
	},
	staffId: {
		type: String,
		required: true,
	},
	department: {
		type: String,
	},
	reason:{
	    type: String,
	},
	accept:{
	    type: String,
	},
	date:{
	    type: String
	},
	password: {
		type: String,
		required: true,
	},
});

const staffModel = mongoose.model('staffModel', staffSchema)

module.exports = staffModel






    // leave:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'leave
    // },