
const router = require('express').Router()
const attendanceController = require('./controller')
const validators = require('./validators')
const {  validateTeacher, accessRouting } = require('../../middlewares/middleware')

router.post('/teacher/attendance/v1', validators.addAttendance,  validateTeacher('ATTENDANCE','W'),accessRouting, attendanceController.addAttendance)
router.put('/teacher/attendance/:id/v1', validators.updateAttendance,  validateTeacher('ATTENDANCE','W'),accessRouting, attendanceController.updateAttendance)

router.get('/teacher/attendance/:id/v1', validateTeacher('ATTENDANCE','R'),accessRouting, attendanceController.getSingleDayAttendance )
router.get('/teacher/attendance/v1', validateTeacher('ATTENDANCE','R'),accessRouting, attendanceController.list )


module.exports = router
