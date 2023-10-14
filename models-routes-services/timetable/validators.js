const { body, param } = require('express-validator')

const addTimeTable = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]
const updateTimeTable = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]

const getTimeTable = [
	param('id').not().isEmpty().isMongoId()
]

module.exports = {
	addTimeTable,
	updateTimeTable,
	getTimeTable,
}