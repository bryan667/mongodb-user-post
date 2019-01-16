const fs = require('fs')
const path = require('path')
const crypto = require("crypto")
const multer = require('multer')
const uploadDir = path.join(__dirname, '../uploads')
const id = crypto.randomBytes(20).toString('hex')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir)
            console.log('Uploads directory created')
        }
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, id + '_' + file.originalname)
    },
})

const upload = multer({
    storage: storage, //call multer.diskStorage
    fileFilter: (req, file, cb)=> {
        let imageTest = /^image/i.test(file.mimetype)
        if (imageTest !== true) {
            req.body.err = 'File is not an image file'
            return cb(null, false)
        }
        cb(null, true)
    }
})

module.exports = {upload}