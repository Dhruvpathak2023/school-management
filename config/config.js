/* eslint-disable no-undef */
require('dotenv').config()

const config = {
	DEPLOY_HOST_URL: process.env.DEPLOY_HOST_URL,
	PORT: process.env.PORT || 5000,
	FRONTEND_HOST_URL: process.env.FRONTEND_HOST_URL || 'https://www.google.com',
	DB_URL: process.env.DB_URL || 'mongodb+srv://sahilbelimsn:pbdev123@schoolmanagementsystem.eymfpvr.mongodb.net/sms?retryWrites=true&w=majority',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	JWT_VALIDITY: '7d',
	LOGIN_HARD_LIMIT_ADMIN: 5,
	REGION: process.env.REGION || 'eu-north-1',
	BUCKETNAME: process.env.BUCKETNAME || 'school-management-sytem-s3',
	ACCESSKEYID: process.env.ACCESSKEYID || 'AKIA45LWA7XWAJBFVTFU',
	SECRETACCESSKEY: process.env.SECRETACCESSKEY || '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'
}

module.exports = config