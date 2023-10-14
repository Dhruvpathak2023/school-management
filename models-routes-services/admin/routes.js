const router = require('express').Router()
const adminController = require('./controller')
const validators = require('./validators')
const { validateAdmin, validate, isAdminAuthenticated, accessRouting } = require('../../middlewares/middleware')

router.post('/admin/hod/login/v1', validators.login, validate, adminController.login)
router.post('/admin/hod/sub-admin/v1', validators.createSubAdmin, /*validateAdmin('SUBADMIN', 'W'),*/ adminController.createSubAdmin)
router.put('/admin/hod/sub-admin/:id/v1', validators.updateSubAdminV2, validateAdmin('SUBADMIN', 'W'), adminController.update)

router.get('/admin/hod/sub-admin/list/v1', validateAdmin('SUBADMIN', 'R'),adminController.list)
router.get('/admin/hod/sub-admin/:id/v1', validateAdmin('SUBADMIN', 'R'),adminController.get)

router.put('/admin/hod/logout/v1', isAdminAuthenticated, adminController.logout)


module.exports = router