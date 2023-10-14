import { body, param } from 'express-validator'

const addCalendar = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]
const updateCalendar = [
	body('file_name').not().isEmpty().isString(),
	body('file_url').not().isEmpty().isString(),
]

const deleteCalendar = [
	param('id').not().isEmpty().isMongoId()
]

export default {
	addCalendar,
	updateCalendar,
	deleteCalendar,
}