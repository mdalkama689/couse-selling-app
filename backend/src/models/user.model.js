const {Schema, model}  = require('mongoose')

const userSchema = new Schema({
    fullName: {
 type: String   
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    }
})

const userModel = model('User', userSchema)
module.exports = userModel