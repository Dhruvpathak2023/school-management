const router = require('express').Router()
const galleryController = require('./controller')
const validators = require('./validators')
const { accessRouting } = require("../../middlewares/middleware")


router.post('/admin/hod/teacher/calendar/v1', accessRouting, validators.addCalendar, galleryController.addCalendar)
router.put('/admin/hod/teacher/calendar/:id/v1', validators.updateCalendar, accessRouting, galleryController.updateCalendar)
router.delete('/admin/hod/teacher/calendar/:id/v1', accessRouting, validators.deleteCalendar, galleryController.deleteCalendar)
router.get('/admin/hod/teacher/student/calendar/v1', accessRouting, galleryController.getCalendar)

module.exports = router