const { body, param } = require('express-validator')

const addGallery = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]
const updateGallery = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]

const getGallery = [
	param('id').not().isEmpty().isMongoId()
]

module.exports = {
	addGallery,
	updateGallery,
	getGallery,
}