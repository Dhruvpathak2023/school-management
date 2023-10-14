const router = require('express').Router()
const noticeController = require('./controller')
const validators = require('./validators')
const { validateTeacher, validateAdmin, isStudentAuthenticated, accessRouting } = require('../../middlewares/middleware')

router.post('/teacher/notice/v1', validators.add, validateTeacher('CLASS','W'), accessRouting,noticeController.addNotice)
router.put('/teacher/notice/:id/v1', validators.update, validateTeacher('CLASS','W'), accessRouting,noticeController.update)
router.get('/teacher/notice/:id/v1',validators.get, validateTeacher('CLASS','R'), accessRouting,noticeController.get)
router.get('/teacher/notice/v1',validators.list,  validateTeacher('CLASS','R'), accessRouting,noticeController.list)



router.post('/admin/notice/v1', validators.add, validateAdmin('CLASS','W'), accessRouting,noticeController.addNotice)
router.put('/admin/notice/:id/v1', validators.update, validateAdmin('CLASS','W'), accessRouting,noticeController.update)
router.get('/admin/notice/:id/v1',validators.get, validateAdmin('CLASS','R'), accessRouting,noticeController.get)
router.get('/admin/notice/v1',validators.list,  validateAdmin('CLASS','R'),accessRouting, noticeController.list)

router.get('/student/notice/:id/v1',validators.get, isStudentAuthenticated,accessRouting, noticeController.get)
router.get('/student/notice/v1',validators.list,  isStudentAuthenticated,accessRouting, noticeController.list)



module.exports = router
