
const router = require('express').Router()
const commentsController = require('./controller')
const validators = require('./validators')
const { validateTeacher, isStudentAuthenticated, validateAdmin, accessRouting } = require('../../../middlewares/middleware')

// router.post('/teacher/comments/v1', validators.addComent, validateTeacher('COMMENTS','W'), commentsController.addComment)
// router.put('/teacher/comments/:id/v1', validators.updateComment, validateTeacher('COMMENTS','W'), commentsController.updateComment)
// router.delete('/teacher/comments/:id/v1', validators.updateComment, validateTeacher('COMMENTS','W'), commentsController.deleteComment)

router.post('/admin/hod/comments/v1', validators.addComent, validateAdmin('COMMENTS','W'),accessRouting, commentsController.addComment)
router.put('/admin/hod/comments/:id/v1', validators.updateComment, validateAdmin('COMMENTS','W'),accessRouting, commentsController.updateComment)
router.delete('/admin/hod/comments/:id/v1', validators.updateComment, validateAdmin('COMMENTS','W'),accessRouting, commentsController.deleteComment)

router.get('/teacher/comments/:id/v1',validators.updateComment, validateTeacher('COMMENTS','R'),accessRouting, commentsController.getComment)
router.get('/teacher/comments/list/:homeWorkId/v1', validators.list, validateTeacher('COMMENTS','R'),accessRouting, commentsController.list)

router.get('/student/comments/:id/v1', validators.updateComment, isStudentAuthenticated,accessRouting, commentsController.getComment)
router.get('/student/comments/:homeworkId/v1', validators.list, isStudentAuthenticated,accessRouting, commentsController.list)
router.put('/student/comments/:id/v1', validators.updateComment, isStudentAuthenticated,accessRouting, commentsController.updateComment)
router.post('/student/comments/v1', validators.addComent, isStudentAuthenticated,accessRouting, commentsController.addComment)
router.delete('/student/comments/:id/v1', validators.updateComment, isStudentAuthenticated,accessRouting, commentsController.deleteComment)




module.exports = router
