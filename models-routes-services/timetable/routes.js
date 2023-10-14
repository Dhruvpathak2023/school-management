const router = require('express').Router()
const timetableController = require('./controller')
const validators = require('./validators')
const {accessRouting} = require("../../middlewares/middleware")

router.post('/admin/teacher/hod/timetable/v1', validators.addTimeTable, accessRouting, timetableController.addTimeTable)
router.put('/admin/teacher/hod/timetable/:id/v1', validators.updateTimeTable,accessRouting, timetableController.updateTimeTable)
router.delete('/admin/teacher/hod/timetable/:id/v1', accessRouting,timetableController.deleteTimeTable)
router.get('/admin/teacher/student/hod/timetable/:id/v1', validators.getTimeTable,accessRouting, timetableController.getTimeTable)

module.exports = router