const multer = require('multer')
const {v4: uuidV4} = require('uuid')


const storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}+ ${uuidV4()}`)
    }
})

const upload = multer({
    storage
}) 
module.exports = upload