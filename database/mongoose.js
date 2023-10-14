const mongoose = require('mongoose')

const config = require('../config/config')

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const con = await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected to : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;


// async function connection(DB_URL) {
// 	try {
// 		// const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true, readPreference: 'secondaryPreferred' }
// 		const con = mongoose.connect(DB_URL, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		})
// 		console.log(`MongoDB Connected to : ${con.connection}`);
// 	} catch (error) {
// 		console.log('err', error)
// 	}
// }
// module.exports = async (app) =>{ 
// 	connection(config.DB_URL, 10, 'Student management').then(() => {
		// app.listen(config.PORT, () => {
		// 	console.log('Magic happens on port :' + config.PORT)
		// })
// 	})

// 	// try {
// 	// 	const con = await mongoose.connect(config.DB_URL,{
// 	// 		useNewUrlParser: true,
// 	// 		useUnifiedTopology: true,
// 	// 		// strictQuery: true
// 	// 	})
// 	// 	mongoose.set('strictQuery', false);
// 	// 	console.log(`Mongo DB connected to: ${con.connection}`);
// 	// } catch (error) {
// 	// 	console.log(error);
// 	// 	process.exit(1)
// 	// }
// }


