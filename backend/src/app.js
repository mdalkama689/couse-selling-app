const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/user.route')
const adminRoutes = require('./routes/admin.route')
const courseRoutes = require('./routes/course.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const CLIENT_URL = process.env.CLIENT_URL 

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}))
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/course', courseRoutes)
module.exports  = app 