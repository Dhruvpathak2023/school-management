const TimetableModel = require("./model")
const { messages, status, jsonStatus } = require('../../helper/api.responses')
const { catchError, getPaginationValues, pick } = require('../../helper/utilities.services')
const awsHelper = require("../../helper/awsHelper")

class timetableController {
    async addTimeTable(req,res){
        try {
            const {file_name} = req.body
            var file_url = await awsHelper.uploadImagefromBackendtoAWS(req.files.timetable_image)
            const newTimeTable = new TimetableModel({file_name, file_url})
            const savedTimeTable = await newTimeTable.save()

            return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].add_success.replace('##',  messages[req.userLanguage].timetable),
				savedTimeTable
			})
        } catch (error) {
            return catchError('timetableController.addClass', error, req,res)
        }
    }
    async getTimeTable(req,res){
        try{
			const data = await TimetableModel.findOne({_id: req.params.id}).lean()
			if(!data) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: messages[req.userLanguage].not_exist.replace('##',  messages[req.userLanguage].timetable),
		})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].success.replace('##',  messages[req.userLanguage].timetable),
				data
			})
			
		}catch(error){
			return catchError('timetableController.getClass', error, req,res)
		}
    }
    async deleteTimeTable(req,res){
        try{
            await TimetableModel.deleteOne({_id: req.params._id })
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].del_success.replace('##',  messages[req.userLanguage].timetable),
			})	
		}catch(error){
			return catchError('timetableController.deleteComment', error, req,res)
		}
    }
    async updateTimeTable(req,res){
        try{
            if(req.files.timetable_image)
                req.body.file_url = await awsHelper.uploadImagefromBackendtoAWS(req.files.timetable_image)

			await TimetableModel.updateOne({ _id: req.params.id },{...req.body})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].update_success.replace('##',  messages[req.userLanguage].timetable)
			})
		}catch(error){
			return catchError('timetableController.addClass', error, req,res)
		}
    }
}

module.exports = new timetableController()