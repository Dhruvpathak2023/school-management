
const router = require('express').Router()
const classController = require('./controller')
const validators = require('./validators')
const { validateTeacher, accessRouting } = require('../../middlewares/middleware')

router.get('/teacher/class/list/v1', validateTeacher('CLASS', 'R'), classController.list)
router.post('/teacher/class/v1', validators.addClass, /*validateTeacher('CLASS','W'),*/ classController.addClass)
router.get('/teacher/class/:id/v1', validators.getClass, validateTeacher('CLASS', 'R'), classController.getClass)


module.exports = router
