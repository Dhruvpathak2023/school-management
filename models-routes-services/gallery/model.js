const mongoose = require('mongoose')

const gallery = new mongoose.Schema({
    file_name:{
        type: String,
        required: true
    },
    file_url:{
        type: String,
        required: true
    }
},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const GalleryModel = mongoose.model('gallery',gallery)
module.exports = GalleryModel