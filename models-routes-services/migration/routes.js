const router = require('express').Router()
const migrationController = require('./controller')
const { accessRouting } = require("../../middlewares/middleware")


router.post('/admin/migrateStudents/v1', migrationController.addStudents)
router.post('/admin/migrateTeachers/v1', migrationController.addTeachers)

module.exports = router