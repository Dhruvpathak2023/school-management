const mongoose = require('mongoose')

const timetable = new mongoose.Schema({
    file_name:{
        type: String,
        required: true
    },
    file_url:{
        type: String,
        required: true
    }
},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const TimetableModel = mongoose.model('timetable',timetable)
module.exports = TimetableModel