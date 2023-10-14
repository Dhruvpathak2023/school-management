const { body, param } = require('express-validator')

const addNotificationDetails = [
	body('module_name').not().isEmpty().isString(),
	body('notification_data').not().isEmpty().isString(),
]
const updateNotificationDetails = [
	body('module_name').not().isEmpty().isString(),
	body('notification_data').not().isEmpty().isString(),
]

const getNotificationDetails = [
	param('id').not().isEmpty().isMongoId()
]

module.exports = {
	addNotificationDetails,
	updateNotificationDetails,
	getNotificationDetails,
}