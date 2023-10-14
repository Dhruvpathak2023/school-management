const router = require('express').Router()
const notificationController = require('./controller')
const validators = require('./validator')
const {accessRouting} = require("../../middlewares/middleware")

router.post('/admin/teacher/hod/student/notification/details/v1', validators.addNotificationDetails, accessRouting, notificationController.addNotificationDetails)
router.put('/admin/teacher/hod/student/notification/details/:id/v1', validators.updateNotificationDetails,accessRouting, notificationController.updateNotificationDetails)
router.delete('/admin/teacher/hod/student/notification/details/:id/v1', accessRouting,notificationController.deleteNotificationDetails)
router.get('/admin/teacher/hod/student/notification/details/:id/v1', validators.getNotificationDetails,accessRouting, notificationController.getNotificationDetails)


module.exports = router