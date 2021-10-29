const mongoose = require('mongoose')
// const staffModel = require('./addStaffModel')

let leaveSchema = new mongoose.Schema({
    accept: String,
    reason: {
        type: String,
        required: [true, 'you have to provide a reason']
    },
    staff:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staffModel'
    },
    date: String
})

module.exports = mongoose.model('leaveModel', leaveSchema)