const { body, param } = require('express-validator')

const addMarksheet = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]
const updateMarksheet = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]

const getMarksheet = [
	param('id').not().isEmpty().isMongoId()
]

module.exports = {
	addMarksheet,
	updateMarksheet,
	getMarksheet,
}