const GalleryModel = require("./model").default
const { messages, status, jsonStatus } = require('../../helper/api.responses')
const { catchError, getPaginationValues, pick } = require('../../helper/utilities.services')
const awsHelper = require("../../helper/awsHelper")

class calendarController {
	async addCalendar(req, res) {
		try {
			const { file_name } = req.body
			var file_url = await awsHelper.uploadImagefromBackendtoAWS(req.files.gallery_image)
			const newGallery = new GalleryModel({ file_name: file_name, file_url })
			const savedGallery = await newGallery.save()

			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].add_success.replace('##', messages[req.userLanguage].gallery),
				savedGallery
			})
		} catch (error) {
			return catchError('galleryController.addClass', error, req, res)
		}
	}
	async getCalendar(req, res) {
		try {
			const data = await GalleryModel.findOne({ _id: req.params.id }).lean()
			if (!data) return res.status(status.BadRequest).jsonp({
				status: jsonStatus.BadRequest, message: messages[req.userLanguage].not_exist.replace('##', messages[req.userLanguage].gallery),
			})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].success.replace('##', messages[req.userLanguage].gallery),
				data
			})

		} catch (error) {
			return catchError('galleryController.getClass', error, req, res)
		}
	}
	async deleteCalendar(req, res) {
		try {
			await GalleryModel.deleteOne({ _id: req.params._id })
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].del_success.replace('##', messages[req.userLanguage].gallery),
			})
		} catch (error) {
			return catchError('galleryController.deleteComment', error, req, res)
		}
	}
	async updateCalendar(req, res) {
		try {
			if (req.files.gallery_image)
				req.body.file_url = await awsHelper.uploadImagefromBackendtoAWS(req.files.gallery_image)

			await GalleryModel.updateOne({ _id: req.params.id }, { ...req.body })
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].update_success.replace('##', messages[req.userLanguage].gallery)
			})
		} catch (error) {
			return catchError('galleryController.addClass', error, req, res)
		}
	}
}

module.exports = new calendarController()