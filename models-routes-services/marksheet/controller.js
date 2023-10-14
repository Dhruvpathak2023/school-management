const MarksheetModel = require("./model")
const { messages, status, jsonStatus } = require('../../helper/api.responses')
const { catchError, getPaginationValues, pick } = require('../../helper/utilities.services')
const awsHelper = require("../../helper/awsHelper")

class marksheetController {
    async addMarksheet(req,res){
        try {
            const {file_name} = req.body
            var file_url = await awsHelper.uploadImagefromBackendtoAWS(req.files.marksheet_image)
            const newMarksheet = new MarksheetModel({file_name, file_url})
            const savedMarksheet = await newMarksheet.save()

            return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].add_success.replace('##',  messages[req.userLanguage].marksheet),
				savedMarksheet
			})
        } catch (error) {
            return catchError('marksheetController.addClass', error, req,res)
        }
    }
    async getMarksheet(req,res){
        try{
			const data = await MarksheetModel.findOne({_id: req.params.id}).lean()
			if(!data) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: messages[req.userLanguage].not_exist.replace('##',  messages[req.userLanguage].marksheet),
		})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].success.replace('##',  messages[req.userLanguage].marksheet),
				data
			})
			
		}catch(error){
			return catchError('marksheetController.getClass', error, req,res)
		}
    }
    async deleteMarksheet(req,res){
        try{
            await MarksheetModel.deleteOne({_id: req.params._id })
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].del_success.replace('##',  messages[req.userLanguage].marksheet),
			})	
		}catch(error){
			return catchError('marksheetController.deleteComment', error, req,res)
		}
    }
    async updateMarksheet(req,res){
        try{
            if(req.files.marksheet_image)
                req.body.file_url = await awsHelper.uploadImagefromBackendtoAWS(req.files.marksheet_image)

			await MarksheetModel.updateOne({ _id: req.params.id },{...req.body})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].update_success.replace('##',  messages[req.userLanguage].marksheet)
			})
		}catch(error){
			return catchError('marksheetController.addClass', error, req,res)
		}
    }
}

module.exports = new marksheetController()