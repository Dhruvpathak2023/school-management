const NotificationModel = require("./model")
const { messages, status, jsonStatus } = require('../../helper/api.responses')
const { catchError, getPaginationValues, pick } = require('../../helper/utilities.services')

class notificationController {
    async addNotificationDetails(req,res){
        try {
            const { module_name, notification_data } = req.body;
            const newNotification = new NotificationModel({ module_name, notification_data });
            const savedNotification = await newNotification.save();
            return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].add_success.replace('##',  messages[req.userLanguage].notification),
				savedNotification
			})
        } catch (error) {
            return catchError('notificationController.addClass', error, req,res)
        }
    }
    async getNotificationDetails(req,res){
        try{
			const data = await NotificationModel.findOne({_id: req.params.id}).lean()
			if(!data) return res.status(status.BadRequest).jsonp({ status: jsonStatus.BadRequest, message: messages[req.userLanguage].not_exist.replace('##',  messages[req.userLanguage].notification),
		})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].success.replace('##',  messages[req.userLanguage].notification),
				data
			})
			
		}catch(error){
			return catchError('notificationController.getClass', error, req,res)
		}
    }
    async deleteNotificationDetails(req,res){
        try{
            await NotificationModel.deleteOne({_id: req.params._id })
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].del_success.replace('##',  messages[req.userLanguage].notification),
			})	
		}catch(error){
			return catchError('notificationController.deleteComment', error, req,res)
		}
    }
    async updateNotificationDetails(req,res){
        try{
            req.body = pick(req.body, ['module_name', 'notification_data'])

			await NotificationModel.updateOne({ _id: req.params.id },{...req.body})
			return res.status(status.OK).jsonp({
				status: jsonStatus.OK,
				message: messages[req.userLanguage].update_success.replace('##',  messages[req.userLanguage].notification)
			})
		}catch(error){
			return catchError('notificationController.addClass', error, req,res)
		}
    }
}

module.exports = new notificationController()