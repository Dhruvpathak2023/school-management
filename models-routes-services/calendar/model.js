import { Schema, model } from 'mongoose'

const calendar = new Schema({
    file_name: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const CalendarModel = model('calendar', calendar)
export default CalendarModel