const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: String,
        required: true,
        maxlength: 100000
    },
    imageID: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    }
}, {timestamps: true})

const Post = mongoose.model('Post', productSchema)
module.exports = { Post }