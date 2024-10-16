require('dotenv').config()
const app = require('./app')
const connectToDB = require('./db/db')

const PORT = process.env.PORT 

app.listen(PORT, async () => {

    await connectToDB()
    console.log('backend is running at : ', PORT) 
})