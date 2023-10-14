const router = require('express').Router()
const marksheetController = require('./controller')
const validators = require('./validators')
const {accessRouting} = require("../../middlewares/middleware")


router.post('/admin/teacher/hod/marksheet/v1', validators.addMarksheet, accessRouting, marksheetController.addMarksheet)
router.put('/admin/teacher/hod/marksheet/:id/v1', validators.updateMarksheet,accessRouting, marksheetController.updateMarksheet)
router.delete('/admin/teacher/hod/marksheet/:id/v1', accessRouting,marksheetController.deleteMarksheet)
router.get('/admin/teacher/hod/student/marksheet/:id/v1', validators.getMarksheet,accessRouting, marksheetController.getMarksheet)

module.exports = router