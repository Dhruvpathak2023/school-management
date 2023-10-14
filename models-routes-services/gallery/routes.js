const router = require('express').Router()
const galleryController = require('./controller')
const validators = require('./validators')
const {accessRouting} = require("../../middlewares/middleware")


router.post('/admin/hod/teacher/gallery/v1', validators.addGallery, accessRouting, galleryController.addGallery)
router.put('/admin/hod/teacher/gallery/:id/v1', validators.updateGallery,accessRouting, galleryController.updateGallery)
router.delete('/admin/hod/teacher/gallery/:id/v1', accessRouting,galleryController.deleteGallery)
router.get('/admin/hod/teacher/student/gallery/:id/v1', validators.getGallery,accessRouting, galleryController.getGallery)

module.exports = router