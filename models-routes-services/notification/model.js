const mongoose = require('mongoose')

const notoficationSchema = new mongoose.Schema({
    module_name: {
        type: String,
        required: true
    },
    notification_data: {
        type: String,
        required: true
    }
},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const NotificationModel = mongoose.model('Notification', notoficationSchema)

module.exports = NotificationModel
