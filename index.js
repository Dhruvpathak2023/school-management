const express = require('express')
const cors = require('cors')
const StudentsModel = require('./models-routes-services/students/model')
const config = require('./config/config')
const app = express()
app.use(cors({ origin: '*' }))
global.appRootPath = __dirname
const express_file_upload = require('express-fileupload')
app.use(express_file_upload())

// require('./database/mongoose')(app)
const connectDB = require("./database/mongoose")
connectDB();
require('./middlewares/index')(app)

require('./middlewares/routes')(app)

app.listen(config.PORT, () => {
    console.log(`Server is running on PORT ${config.PORT} ...`)
})

module.exports = app
