const {connect, mongo, default: mongoose} = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONG0_URL

const connectToDB = async () => {
    
    try {
await mongoose.connect(MONGO_URL)
    console.log('DB connected successfully')

    } catch (error) {
        console.log('error during connection to database : ', error)
        process.exit(1)
    }
}
 
module.exports = connectToDB