const GalleryModel = require("./model").default
const { messages, status, jsonStatus } = require('../../helper/api.responses')
const { catchError, getPaginationValues, pick } = require('../../helper/utilities.services')
const awsHelper = require("../../helper/awsHelper")
const xlsx = require('xlsx');
const StudentsModel = require("../students/model")
const TeacherModel = require("../teachers/model")
const ClassModel = require("../class/model");
const { randomUUID } = require("crypto");
// const multer = require('multer')



class migrationController {
	async addStudents(req, res) {
		try {

			const file = req.files.file.data.buffer
			console.log(file)
			const workbook = xlsx.readFile(file, {
				cellDates: true,
				dateFormats: ['dd/mm/yyyy', 'dd-mm-yyyy']
			});
			async function getClassId(sheetName) {
				const classDetails = await ClassModel.findOne({ name: sheetName.trim() });
				console.log("Classss>>>", classDetails?._id);
				return classDetails?._id
			}
			async function asyncTaskForSheet(sheetName) {
				const classID = await getClassId(sheetName)

				const worksheet = workbook.Sheets[sheetName];
				const data = xlsx.utils.sheet_to_json(worksheet, { raw: false });
				console.log("sheetName>>>", sheetName)

				const mappings = {
					'No': 'rollNo',
					'NAME': 'firstName',
					'NAME': 'lastName',
					'NAME': "father's name",
					'M/F': 'gender',
					'DOB': 'dateOfBirth',
					'ADDRESS': 'address',
					'Mobile': 'phoneNumber',
					'Mobile(M)': 'phoneNumber',
					'Mobile(F)': 'phoneNumber',
				};

				function formatDat(inputDate) {
					inputDate = inputDate.replace(/[\\/]/g, "-");
					const dateParts = inputDate.split("-");

					const jsDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).setMinutes(330)
					console.log("Date>>>>", jsDate)
					return jsDate
				}



				if (!classID) return
				const mappedData = data.map((row) => {
					const obj = {};
					let a = row['NAME'].split(" ")
					obj.firstName = a[1]
					obj.lastName = a[0]
					obj.fatherName = a[2]
					// obj.username = Buffer.from(row['NAME']).toString('base64').slice(0, 15)?.toLowerCase()
					obj.username = randomUUID().split("-")[0]
					obj.password = "$2a$12$dbiBzQ5KiYj/8qSziKmOJOPLoyXbRNYZUsw/yZDtrUdU.4Vrd7g9m"   // "svm"
					obj.classId = classID

					for (const key in mappings) {
						if (key === 'NAME') {
							continue;
						}
						const fieldName = mappings[key]; // firstName lastname

						// if (!obj.classId) continue;
						if (!Object.keys(obj).includes(fieldName) && row[key]) {
							if (fieldName === 'dateOfBirth') {
								if (!row[key]) row[key] = 1
								else row[key] = formatDat(row[key]);
							}
							if (fieldName === 'gender') {
								obj[fieldName] = row[key].replace("M", "Male").replace("F", "Female").trim();
							}
							else {

								obj[fieldName] = row[key];
							}
						}
						// else if (fieldName === 'dateOfBirth') row[key] = 1

					}
					return obj;
				});


				async function insertData() {
					try {
						await StudentsModel.insertMany(mappedData)
						console.log('Data inserted successfully into Database >>>');


					} catch (error) {
						console.error('Error inserting data >>>', error);
						throw new Error()
					}
				}

				await insertData();

			}



			async function main() {
				const sheetNames = workbook.SheetNames;

				const sheetPromises = sheetNames.map(async (sheetName) => {
					await asyncTaskForSheet(sheetName);
				});

				await Promise.all(sheetPromises).then(() => console.log("thennn")).catch((e) => console.log(e));

			}

			main().then(() => {
				return res.status(status.OK).jsonp({
					status: jsonStatus.OK,
					message: messages[req.userLanguage].add_success.replace('##', messages[req.userLanguage].students),
				})
			});



		} catch (error) {
			return catchError('migrationController.add', error, req, res)
		}
	}


	async addTeachers(req, res) {
		try {
			const { roleId } = req.body
			console.log("RoleID>>>", roleId)
			const file = req.files.file.data.buffer
			console.log(file)
			const workbook = xlsx.readFile(file);

			async function asyncTaskForSheet(sheetName) {
				const worksheet = workbook.Sheets[sheetName];
				const data = xlsx.utils.sheet_to_json(worksheet, { raw: false });
				console.log("sheetName>>>", sheetName)

				const mappings = {
					'NAME': 'name',
					'Mobile': 'phoneNumber',
					'Mobile(M)': 'phoneNumber',
					'Mobile(F)': 'phoneNumber',
				};


				const mappedData = data.map((row) => {
					const obj = {};
					obj.username = Buffer.from(row['NAME']).toString('base64').slice(0, 8)?.toLowerCase()
					obj.password = "$2a$12$dbiBzQ5KiYj/8qSziKmOJOPLoyXbRNYZUsw/yZDtrUdU.4Vrd7g9m"   // "svm"
					obj.roleId = roleId || "650f88c8a9d41b0ddd90b8fb"

					for (const key in mappings) {

						const fieldName = mappings[key];
						if (!Object.keys(obj).includes(fieldName) && row[key]) {
							obj[fieldName] = row[key];
						}
					}
					return obj;
				});


				async function insertData() {
					try {
						await TeacherModel.insertMany(mappedData);
						console.log('Data inserted successfully into Database >>>');
					} catch (error) {
						console.error('Error inserting data >>>', error);
						throw new Error()
					}
				}

				await insertData();

			}



			async function main() {
				const sheetNames = workbook.SheetNames;

				const sheetPromises = sheetNames.map(async (sheetName) => {
					await asyncTaskForSheet(sheetName);
				});

				await Promise.all(sheetPromises).then(() => {
					return res.status(status.OK).jsonp({
						status: jsonStatus.OK,
						message: messages[req.userLanguage].add_success.replace('##', messages[req.userLanguage].teachers),
					})
				}).catch((e) => {
					return catchError('migrationController.add', e, req, res)

				});

			}

			main();



		} catch (error) {
			return catchError('migrationController.add', error, req, res)
		}
	}
}

module.exports = new migrationController()